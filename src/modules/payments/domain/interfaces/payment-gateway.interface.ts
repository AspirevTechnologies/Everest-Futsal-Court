/**
 * SADP Pattern: Adapter Port Interface
 * Any payment gateway must adhere to this contract
 */

export interface PaymentIntentRequest {
  bookingId: string;
  amount: number;
  currency: string;
  customerEmail: string;
}

export interface PaymentIntentResponse {
  transactionId: string;
  clientSecret?: string;
  status: "REQUIRES_PAYMENT" | "PAID" | "PENDING";
  checkoutUrl?: string;
}

export interface IPaymentGateway {
  readonly providerName: string;
  createPaymentIntent(request: PaymentIntentRequest): Promise<PaymentIntentResponse>;
  verifyPayment(transactionId: string): Promise<boolean>;
}
