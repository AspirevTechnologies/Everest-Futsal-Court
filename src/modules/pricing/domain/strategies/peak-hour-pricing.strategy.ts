import { IPricingStrategy, PricingContext } from "./pricing-strategy.interface";
import { FUTSAL_CONFIG } from "@/config/futsal.config";

export class PeakHourPricingStrategy implements IPricingStrategy {
  readonly name = "Peak Evening Hours";

  isApplicable(context: PricingContext): boolean {
    const hour = context.startTime.getHours();
    return (
      hour >= FUTSAL_CONFIG.peakHours.startHour &&
      hour < FUTSAL_CONFIG.peakHours.endHour
    );
  }

  calculate(context: PricingContext): number {
    const hours = context.durationMinutes / 60;
    return (
      context.baseHourlyRate *
      hours *
      FUTSAL_CONFIG.peakHours.peakPriceMultiplier
    );
  }
}
