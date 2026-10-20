import {
  IPaymentGateway,
  PaymentIntentRequest,
  PaymentIntentResponse,
} from "../../domain/interfaces/payment-gateway.interface";

/**
 * SADP Pattern: Adapter Pattern
 * Adapts Stripe SDK into unified IPaymentGateway interface
 */
export class StripePaymentAdapter implements IPaymentGateway {
  readonly providerName = "stripe";

  async createPaymentIntent(request: PaymentIntentRequest): Promise<PaymentIntentResponse> {
    // When ready, plug `stripe.paymentIntents.create` here
    return {
      transactionId: `pi_mock_${Date.now()}`,
      clientSecret: `mock_secret_${Math.random()}`,
      status: "REQUIRES_PAYMENT",
      checkoutUrl: `https://checkout.stripe.com/pay/mock-${request.bookingId}`,
    };
  }

  async verifyPayment(transactionId: string): Promise<boolean> {
    return transactionId.startsWith("pi_");
  }
}
