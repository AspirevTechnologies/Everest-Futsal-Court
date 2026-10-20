import { ICourtRepository } from "../../domain/repositories/court.repository.interface";
import { Court } from "../../domain/entities/court.entity";
import { Result } from "@/shared/types/result.type";

/**
 * SADP Pattern: Application Use Case (Single Responsibility Principle)
 * Fetches available courts for customer listing
 */
export class GetAvailableCourtsUseCase {
  constructor(private readonly courtRepo: ICourtRepository) {}

  async execute(): Promise<Result<Court[]>> {
    try {
      const courts = await this.courtRepo.findAllActive();
      return Result.ok(courts);
    } catch (error) {
      return Result.fail(
        error instanceof Error ? error : new Error("Failed to load courts")
      );
    }
  }
}
