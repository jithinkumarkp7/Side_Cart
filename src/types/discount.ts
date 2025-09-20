export type DiscountType = "percentage" | "amount";
export type PriceType = "oneTime" | "monthly";

export interface Discount {
  id: string;
  type: DiscountType;
  priceType: PriceType;
  value: number;
  duration?: number;
  description?: string;
}
