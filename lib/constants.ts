// Constants that can be shared between client and server

// Environment check
export const isProductionEnvironment = process.env.NODE_ENV === "production";

export const isTestEnvironment = Boolean(
  process.env.PLAYWRIGHT_TEST_BASE_URL ||
    process.env.PLAYWRIGHT ||
    process.env.CI_PLAYWRIGHT
);

// Define the CreditPackage type
export interface CreditPackage {
  id: string;
  credits: number;
  price: number;
}

// Credit packages available for purchase
export const creditPackages: CreditPackage[] = [
  { id: "basic", credits: 100, price: 5 },
  { id: "standard", credits: 300, price: 12 },
  { id: "premium", credits: 500, price: 18 },
];
