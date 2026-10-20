import { Court } from "../entities/court.entity";

/**
 * SADP Pattern: Repository Interface (Port)
 * Decouples domain logic from concrete database storage (Inversion of Control)
 */
export interface ICourtRepository {
  findById(id: string): Promise<Court | null>;
  findBySlug(slug: string): Promise<Court | null>;
  findAllActive(): Promise<Court[]>;
  save(court: Court): Promise<void>;
  updateStatus(id: string, isActive: boolean): Promise<void>;
}
