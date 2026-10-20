import { PitchFeatures, PitchSize, PitchSurface } from "../value-objects/surface-type.vo";

/**
 * SADP Pattern: Domain Entity
 * Rich domain model encapsulating futsal court state and business logic
 */

export interface CourtProps {
  id: string;
  name: string; // e.g., "Pitch Alpha - Champions Arena"
  slug: string;
  size: PitchSize;
  surface: PitchSurface;
  features: PitchFeatures;
  baseHourlyRate: number;
  imageUrl?: string;
  isActive: boolean;
  maintenanceSchedule?: {
    from: Date;
    to: Date;
    reason: string;
  }[];
}

export class Court {
  constructor(private readonly props: CourtProps) {}

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get slug(): string {
    return this.props.slug;
  }

  get size(): PitchSize {
    return this.props.size;
  }

  get surface(): PitchSurface {
    return this.props.surface;
  }

  get features(): PitchFeatures {
    return this.props.features;
  }

  get baseHourlyRate(): number {
    return this.props.baseHourlyRate;
  }

  get imageUrl(): string | undefined {
    return this.props.imageUrl;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  public isAvailableOn(date: Date): boolean {
    if (!this.props.isActive) return false;

    // Check maintenance intervals
    if (this.props.maintenanceSchedule) {
      for (const block of this.props.maintenanceSchedule) {
        if (date >= block.from && date <= block.to) {
          return false;
        }
      }
    }
    return true;
  }

  public toJSON(): CourtProps {
    return { ...this.props };
  }
}
