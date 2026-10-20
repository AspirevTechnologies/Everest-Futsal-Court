export type UserRole = "PLAYER" | "CAPTAIN" | "STAFF" | "ADMIN";

export interface UserProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  teamName?: string;
  loyaltyPoints: number;
}

export class User {
  constructor(private props: UserProps) {}

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get role(): UserRole {
    return this.props.role;
  }

  get teamName(): string | undefined {
    return this.props.teamName;
  }

  public toJSON(): UserProps {
    return { ...this.props };
  }
}
