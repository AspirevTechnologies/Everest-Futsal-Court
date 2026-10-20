/**
 * SADP Pattern: Value Object / Entity for Pitch Slot
 */
export interface TimeSlotProps {
  courtId: string;
  startTime: Date;
  endTime: Date;
  isBooked: boolean;
  price: number;
}

export class TimeSlot {
  constructor(private readonly props: TimeSlotProps) {}

  get courtId(): string {
    return this.props.courtId;
  }

  get startTime(): Date {
    return this.props.startTime;
  }

  get endTime(): Date {
    return this.props.endTime;
  }

  get isBooked(): boolean {
    return this.props.isBooked;
  }

  get price(): number {
    return this.props.price;
  }

  public overlapsWith(start: Date, end: Date): boolean {
    return this.startTime < end && this.endTime > start;
  }

  public toJSON(): TimeSlotProps {
    return { ...this.props };
  }
}
