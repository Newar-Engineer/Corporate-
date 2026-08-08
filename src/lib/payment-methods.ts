import type { IconType } from "react-icons";
import { FiSmartphone, FiSend, FiCreditCard, FiDollarSign } from "react-icons/fi";

export interface PaymentMethod {
  slug: string;
  name: string;
  icon: IconType;
  number: string;
  type: "Wallet" | "Bank Transfer";
  qrPath: string | null;
  description: string;
  steps: string[];
}

export const paymentMethods: PaymentMethod[] = [
  {
    slug: "esewa",
    name: "eSewa",
    icon: FiSmartphone,
    number: "9766453836",
    type: "Wallet",
    qrPath: "/esewaqr.jpeg",
    description:
      "Scan the QR code with the eSewa app to pay directly into our eSewa wallet, or send money to our number.",
    steps: [
      "Open the eSewa app on your phone and log in to your wallet.",
      "Tap the Scan icon and point your camera at the QR code on this page.",
      "Enter the amount you are paying and check the payee, then confirm.",
      "Tap Confirm and enter your eSewa PIN to complete the payment.",
      "Send the transaction screenshot to our contact channels so we can confirm it right away.",
    ],
  },
  {
    slug: "khalti",
    name: "Khalti",
    icon: FiSend,
    number: "9766453836",
    type: "Wallet",
    qrPath: null,
    description:
      "Pay directly into our Khalti wallet using the mobile number below. Copy the number or type it in the Khalti app.",
    steps: [
      "Open the Khalti app on your phone.",
      "Tap Transfer or Send Money from the home screen.",
      "Enter our Khalti number 9766453836 as the recipient.",
      "Enter the amount, add a note, and confirm with your Khalti PIN.",
      "Send the transaction screenshot to our contact channels so we can confirm it right away.",
    ],
  },
  {
    slug: "global-ime",
    name: "Global IME Bank",
    icon: FiCreditCard,
    number: "9744400011",
    type: "Bank Transfer",
    qrPath: "/Globalg.jpeg",
    description:
      "Scan the QR code with your Global IME banking app or transfer directly to our Global IME Bank account.",
    steps: [
      "Open the Global IME Bank app or internet banking on your device.",
      "Go to Fund Transfer and choose our account or scan the QR code.",
      "Enter our account number 9744400011 and your payment amount.",
      "Enter your SMS/OTP code to authorize the transfer.",
      "Send the transaction screenshot to our contact channels so we can confirm it right away.",
    ],
  },
  {
    slug: "siddhartha",
    name: "Siddhartha Bank",
    icon: FiDollarSign,
    number: "9766453836",
    type: "Bank Transfer",
    qrPath: "/siddhartha.jpeg",
    description:
      "Scan the QR code with your Siddhartha banking app or transfer directly to our Siddhartha Bank account.",
    steps: [
      "Open your Siddhartha Bank mobile or internet banking.",
      "Go to Fund Transfer and choose our account or scan the QR code.",
      "Enter our Siddhartha Bank account number 9766453836 as the payee.",
      "Enter the amount and authorize with your OTP/SMS code.",
      "Send the transfer screenshot to our contact channels so we can confirm it right away.",
    ],
  },
];

export function getPaymentMethodBySlug(
  slug: string
): PaymentMethod | undefined {
  return paymentMethods.find((m) => m.slug === slug);
}