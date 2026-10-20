import { NextResponse } from "next/server";
import { bookingRepository } from "@/modules/bookings/infrastructure/repositories/mock-booking.repository";

/**
 * SADP Pattern: Infrastructure Route Adapter (Webhook Inbound Port)
 */
export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // In production, verify signature with StripePaymentAdapter
    const { referenceNumber, paymentStatus } = payload;

    if (paymentStatus === "succeeded" && referenceNumber) {
      const booking = await bookingRepository.findByReference(referenceNumber);
      if (booking) {
        booking.confirm();
        await bookingRepository.save(booking);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 400 });
  }
}
