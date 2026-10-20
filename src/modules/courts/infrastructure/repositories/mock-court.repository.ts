import { ICourtRepository } from "../../domain/repositories/court.repository.interface";
import { Court } from "../../domain/entities/court.entity";

/**
 * SADP Pattern: Concrete Repository Adapter
 * In-memory implementation with realistic Futsal courts
 */
export class MockCourtRepository implements ICourtRepository {
  private courts: Court[] = [
    new Court({
      id: "court-1",
      name: "The Everest Main Futsal Arena (5v5)",
      slug: "everest-main-futsal",
      size: "5_A_SIDE",
      surface: "ARTIFICIAL_TURF",
      features: {
        isIndoor: true,
        hasFloodlights: true,
        hasAirConditioning: false,
        hasScoreboard: true,
        hasLiveStreaming: true,
      },
      baseHourlyRate: 3500, // In LKR (Sri Lankan Rupees)
      imageUrl: "/images/card-futsal.jpg",
      isActive: true,
    }),
    new Court({
      id: "court-2",
      name: "The Everest Indoor Cricket & Training Pitch",
      slug: "everest-cricket-pitch",
      size: "5_A_SIDE",
      surface: "RUBBER_INDOOR",
      features: {
        isIndoor: true,
        hasFloodlights: true,
        hasAirConditioning: false,
        hasScoreboard: false,
        hasLiveStreaming: false,
      },
      baseHourlyRate: 3000,
      imageUrl: "/images/card-cricket.jpg",
      isActive: true,
    }),
  ];

  async findById(id: string): Promise<Court | null> {
    return this.courts.find((c) => c.id === id) ?? null;
  }

  async findBySlug(slug: string): Promise<Court | null> {
    return this.courts.find((c) => c.slug === slug) ?? null;
  }

  async findAllActive(): Promise<Court[]> {
    return this.courts.filter((c) => c.isActive);
  }

  async save(court: Court): Promise<void> {
    const idx = this.courts.findIndex((c) => c.id === court.id);
    if (idx >= 0) {
      this.courts[idx] = court;
    } else {
      this.courts.push(court);
    }
  }

  async updateStatus(id: string, isActive: boolean): Promise<void> {
    const court = await this.findById(id);
    if (court) {
      const updated = new Court({ ...court.toJSON(), isActive });
      await this.save(updated);
    }
  }
}

// Default singleton instance for injection
export const courtRepository = new MockCourtRepository();
