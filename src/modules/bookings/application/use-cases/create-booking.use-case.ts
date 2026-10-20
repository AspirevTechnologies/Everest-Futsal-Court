import { IBookingRepository } from "../../domain/repositories/booking.repository.interface";
import { ICourtRepository } from "@/modules/courts/domain/repositories/court.repository.interface";
import { Booking } from "../../domain/entities/booking.entity";
import { SlotCollisionRule } from "../../domain/rules/slot-collision.rule";
import { pricingCalculator } from "@/modules/pricing/domain/services/pricing-calculator.service";
import { Result } from "@/shared/types/result.type";

export interface CreateBookingDTO {
  courtId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  startTime: Date;
  durationMinutes: number;
}

/**
 * SADP Pattern: Application Use Case
 * Orchestrates business rules, pricing strategies, and persistence
 */
export class CreateBookingUseCase {
  constructor(
    private readonly bookingRepo: IBookingRepository,
    private readonly courtRepo: ICourtRepository
  ) {}

  async execute(dto: CreateBookingDTO): Promise<Result<Booking>> {
    try {
      // 1. Verify court exists & is active
      const court = await this.courtRepo.findById(dto.courtId);
      if (!court) {
        return Result.fail(new Error("Futsal court not found"));
      }

      if (!court.isAvailableOn(dto.startTime)) {
        return Result.fail(new Error("Court is under maintenance or inactive on this date"));
      }

      // 2. Calculate end time
      const endTime = new Date(dto.startTime.getTime() + dto.durationMinutes * 60 * 1000);

      // 3. Check for double booking collision (Domain Invariant)
      const existingBookings = await this.bookingRepo.findByCourtAndDate(dto.courtId, dto.startTime);
      const isAvailable = SlotCollisionRule.isSlotAvailable(existingBookings, dto.startTime, endTime);

      if (!isAvailable) {
        return Result.fail(new Error("This time slot is already reserved by another team."));
      }

      // 4. Calculate dynamic pricing using Strategy Pattern
      const { totalPrice } = pricingCalculator.calculateSlotPrice({
        baseHourlyRate: court.baseHourlyRate,
        startTime: dto.startTime,
        durationMinutes: dto.durationMinutes,
      });

      // 5. Create aggregate domain entity
      const referenceNumber = `FUT-${Math.floor(1000 + Math.random() * 9000)}`;
      const booking = new Booking({
        id: `b_${Date.now()}`,
        referenceNumber,
        courtId: court.id,
        courtName: court.name,
        customerName: dto.customerName,
        customerEmail: dto.customerEmail,
        customerPhone: dto.customerPhone,
        startTime: dto.startTime,
        endTime,
        durationMinutes: dto.durationMinutes,
        totalAmount: totalPrice,
        status: "CONFIRMED",
        createdAt: new Date(),
      });

      // 6. Persist through repository port
      await this.bookingRepo.save(booking);

      return Result.ok(booking);
    } catch (error) {
      return Result.fail(error instanceof Error ? error : new Error("Booking creation failed"));
    }
  }
}
