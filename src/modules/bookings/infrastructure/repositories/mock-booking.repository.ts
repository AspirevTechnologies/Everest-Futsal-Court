import { IBookingRepository } from "../../domain/repositories/booking.repository.interface";
import { Booking } from "../../domain/entities/booking.entity";

/**
 * SADP Pattern: Mock In-Memory Booking Repository Adapter
 */
export class MockBookingRepository implements IBookingRepository {
  private bookings: Booking[] = [
    new Booking({
      id: "booking-101",
      referenceNumber: "FUT-8921",
      courtId: "court-1",
      courtName: "The Everest Main Futsal Arena (5v5)",
      customerName: "Mohamed Rameez",
      customerEmail: "rameez@example.com",
      customerPhone: "+94 77 123 4567",
      startTime: new Date(new Date().setHours(18, 0, 0, 0)),
      endTime: new Date(new Date().setHours(19, 0, 0, 0)),
      durationMinutes: 60,
      totalAmount: 4375, // LKR with peak floodlight pricing
      status: "CONFIRMED",
      createdAt: new Date(),
    }),
  ];

  async findById(id: string): Promise<Booking | null> {
    return this.bookings.find((b) => b.id === id) ?? null;
  }

  async findByReference(referenceNumber: string): Promise<Booking | null> {
    return this.bookings.find((b) => b.referenceNumber === referenceNumber) ?? null;
  }

  async findByCourtAndDate(courtId: string, date: Date): Promise<Booking[]> {
    return this.bookings.filter((b) => {
      const sameCourt = b.courtId === courtId;
      const sameDay = b.startTime.toDateString() === date.toDateString();
      return sameCourt && sameDay;
    });
  }

  async findByCustomerEmail(email: string): Promise<Booking[]> {
    return this.bookings.filter((b) => b.customerEmail.toLowerCase() === email.toLowerCase());
  }

  async findAll(): Promise<Booking[]> {
    return [...this.bookings];
  }

  async save(booking: Booking): Promise<void> {
    const idx = this.bookings.findIndex((b) => b.id === booking.id);
    if (idx >= 0) {
      this.bookings[idx] = booking;
    } else {
      this.bookings.push(booking);
    }
  }
}

export const bookingRepository = new MockBookingRepository();
