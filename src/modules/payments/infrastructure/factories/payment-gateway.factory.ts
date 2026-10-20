import { IPaymentGateway } from "../../domain/interfaces/payment-gateway.interface";
import { StripePaymentAdapter } from "../adapters/stripe-payment.adapter";
import { CashCounterAdapter } from "../adapters/cash-counter.adapter";

/**
 * SADP Pattern: Factory Method Pattern (GoF)
 * Dynamically instantiates the right payment adapter based on provider string
 */
export class PaymentGatewayFactory {
  public static create(provider: "stripe" | "cash_on_arrival" | string): IPaymentGateway {
    switch (provider) {
      case "stripe":
        return new StripePaymentAdapter();
      case "cash_on_arrival":
        return new CashCounterAdapter();
      default:
        throw new Error(`Unsupported payment provider: ${provider}`);
    }
  }
}
