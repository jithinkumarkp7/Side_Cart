import type { Discount } from "@/types/discount";

export function calculateNewPrice(
  oneTimePrice: number,
  monthlyPrice: number,
  discounts: Discount[]
) {
  let finalOneTime = oneTimePrice;
  let finalMonthly = monthlyPrice;
  let monthlyBreakdown: { firstMonths: number; restMonths: number } | undefined;

  discounts.forEach((discount) => {
    const applyDiscount = (
      price: number,
      value: number,
      type: Discount["type"]
    ) => {
      return type === "percentage"
        ? price - (price * value) / 100
        : price - value;
    };

    if (discount.priceType === "oneTime") {
      finalOneTime = applyDiscount(finalOneTime, discount.value, discount.type);
    }

    if (discount.priceType === "monthly") {
      const newMonthly = applyDiscount(
        monthlyPrice,
        discount.value,
        discount.type
      );
      if (discount.duration) {
        monthlyBreakdown = {
          firstMonths: newMonthly * discount.duration,
          restMonths: monthlyPrice * (12 - discount.duration),
        };
      }
      finalMonthly = newMonthly;
    }
  });

  return { oneTime: finalOneTime, monthly: finalMonthly, monthlyBreakdown };
}
