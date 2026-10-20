import { IPricingStrategy, PricingContext } from "./pricing-strategy.interface";
import { FUTSAL_CONFIG } from "@/config/futsal.config";

export class WeekendPricingStrategy implements IPricingStrategy {
  readonly name = "Weekend Prime Rate";

  isApplicable(context: PricingContext): boolean {
    const day = context.startTime.getDay();
    // 0 = Sunday, 6 = Saturday
    return day === 0 || day === 6;
  }

  calculate(context: PricingContext): number {
    const hours = context.durationMinutes / 60;
    return context.baseHourlyRate * hours * FUTSAL_CONFIG.weekendMultiplier;
  }
}
