import {
  IPaymentGateway,
  PaymentIntentRequest,
  PaymentIntentResponse,
} from "../../domain/interfaces/payment-gateway.interface";

/**
 * SADP Pattern: Adapter Pattern
 * Handles walk-in cash payments at the futsal arena desk
 */
export class CashCounterAdapter implements IPaymentGateway {
  readonly providerName = "cash_on_arrival";

  async createPaymentIntent(request: PaymentIntentRequest): Promise<PaymentIntentResponse> {
    return {
      transactionId: `cash_${Date.now()}`,
      status: "PENDING",
    };
  }

  async verifyPayment(transactionId: string): Promise<boolean> {
    return true;
  }
}
