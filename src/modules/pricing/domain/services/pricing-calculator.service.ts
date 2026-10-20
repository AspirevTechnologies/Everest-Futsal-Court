import { IPricingStrategy, PricingContext } from "../strategies/pricing-strategy.interface";
import { PeakHourPricingStrategy } from "../strategies/peak-hour-pricing.strategy";
import { WeekendPricingStrategy } from "../strategies/weekend-pricing.strategy";
import { RegularPricingStrategy } from "../strategies/regular-pricing.strategy";

/**
 * SADP Pattern: Domain Service using Strategy Pattern
 * Evaluates appropriate pricing rule based on time slot
 */
export class PricingCalculatorService {
  private strategies: IPricingStrategy[];

  constructor() {
    // Ordered by specificity (highest priority first)
    this.strategies = [
      new PeakHourPricingStrategy(),
      new WeekendPricingStrategy(),
      new RegularPricingStrategy(),
    ];
  }

  public calculateSlotPrice(context: PricingContext): {
    totalPrice: number;
    appliedStrategy: string;
  } {
    for (const strategy of this.strategies) {
      if (strategy.isApplicable(context)) {
        return {
          totalPrice: Math.round(strategy.calculate(context)),
          appliedStrategy: strategy.name,
        };
      }
    }

    const fallback = new RegularPricingStrategy();
    return {
      totalPrice: fallback.calculate(context),
      appliedStrategy: fallback.name,
    };
  }
}

export const pricingCalculator = new PricingCalculatorService();
