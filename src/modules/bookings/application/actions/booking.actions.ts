"use server";

import { CreateBookingUseCase } from "../use-cases/create-booking.use-case";
import { bookingRepository } from "../../infrastructure/repositories/mock-booking.repository";
import { courtRepository } from "@/modules/courts/infrastructure/repositories/mock-court.repository";

/**
 * SADP Pattern: Presentation / Driving Adapter (Next.js Server Action)
 * Connects UI actions directly to application use cases without leaky abstractions
 */
export async function createBookingAction(formData: {
  courtId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  startTime: string; // ISO string from form
  durationMinutes: number;
}) {
  const useCase = new CreateBookingUseCase(bookingRepository, courtRepository);

  const result = await useCase.execute({
    courtId: formData.courtId,
    customerName: formData.customerName,
    customerEmail: formData.customerEmail,
    customerPhone: formData.customerPhone,
    startTime: new Date(formData.startTime),
    durationMinutes: formData.durationMinutes,
  });

  if (!result.success) {
    return {
      success: false,
      error: result.error.message,
    };
  }

  return {
    success: true,
    data: result.data.toJSON(),
  };
}
