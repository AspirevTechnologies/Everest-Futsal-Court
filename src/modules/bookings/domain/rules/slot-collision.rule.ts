import { Booking } from "../entities/booking.entity";

/**
 * SADP Pattern: Specification / Domain Invariant Rule
 * Enforces business rule: No double bookings on the same futsal pitch
 */
export class SlotCollisionRule {
  public static isSlotAvailable(
    existingBookings: Booking[],
    requestedStart: Date,
    requestedEnd: Date
  ): boolean {
    return !existingBookings.some((booking) => {
      // Disregard cancelled bookings
      if (booking.status === "CANCELLED") return false;

      // Check time overlap: (startA < endB) and (endA > startB)
      return requestedStart < booking.endTime && requestedEnd > booking.startTime;
    });
  }
}
