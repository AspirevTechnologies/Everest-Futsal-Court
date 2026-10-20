/**
 * SADP Pattern: Aggregate Root / Domain Entity
 * Encapsulates full booking state, status transitions, and invariants
 */

export type BookingStatus =
  | "PENDING_PAYMENT"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED"
  | "NO_SHOW";

export interface BookingProps {
  id: string;
  referenceNumber: string;
  courtId: string;
  courtName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  startTime: Date;
  endTime: Date;
  durationMinutes: number;
  totalAmount: number;
  status: BookingStatus;
  createdAt: Date;
}

export class Booking {
  constructor(private props: BookingProps) {}

  get id(): string {
    return this.props.id;
  }

  get referenceNumber(): string {
    return this.props.referenceNumber;
  }

  get courtId(): string {
    return this.props.courtId;
  }

  get courtName(): string {
    return this.props.courtName;
  }

  get customerName(): string {
    return this.props.customerName;
  }

  get customerEmail(): string {
    return this.props.customerEmail;
  }

  get customerPhone(): string {
    return this.props.customerPhone;
  }

  get startTime(): Date {
    return this.props.startTime;
  }

  get endTime(): Date {
    return this.props.endTime;
  }

  get durationMinutes(): number {
    return this.props.durationMinutes;
  }

  get totalAmount(): number {
    return this.props.totalAmount;
  }

  get status(): BookingStatus {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  // Domain state transitions
  public confirm(): void {
    if (this.props.status === "CANCELLED") {
      throw new Error("Cannot confirm a cancelled booking");
    }
    this.props.status = "CONFIRMED";
  }

  public cancel(): void {
    if (this.props.status === "COMPLETED") {
      throw new Error("Cannot cancel an already completed game");
    }
    this.props.status = "CANCELLED";
  }

  public toJSON(): BookingProps {
    return { ...this.props };
  }
}
