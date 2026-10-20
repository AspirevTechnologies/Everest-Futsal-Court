/**
 * SADP Pattern: Strategy Pattern (GoF)
 * Interface for interchangeable pricing calculation strategies
 */

export interface PricingContext {
  baseHourlyRate: number;
  startTime: Date;
  durationMinutes: number;
  hasLightsRequested?: boolean;
}

export interface IPricingStrategy {
  readonly name: string;
  isApplicable(context: PricingContext): boolean;
  calculate(context: PricingContext): number;
}
