import { IPricingStrategy, PricingContext } from "./pricing-strategy.interface";

export class RegularPricingStrategy implements IPricingStrategy {
  readonly name = "Regular Pricing";

  isApplicable(): boolean {
    return true; // Default fallback
  }

  calculate(context: PricingContext): number {
    const hours = context.durationMinutes / 60;
    return context.baseHourlyRate * hours;
  }
}
