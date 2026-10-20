import { Booking } from "../entities/booking.entity";

/**
 * SADP Pattern: Booking Repository Port
 */
export interface IBookingRepository {
  findById(id: string): Promise<Booking | null>;
  findByReference(referenceNumber: string): Promise<Booking | null>;
  findByCourtAndDate(courtId: string, date: Date): Promise<Booking[]>;
  findByCustomerEmail(email: string): Promise<Booking[]>;
  findAll(): Promise<Booking[]>;
  save(booking: Booking): Promise<void>;
}
