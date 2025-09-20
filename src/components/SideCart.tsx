import { useDiscounts } from "@/context/DiscountContext";
import React from "react";

interface Props {
  oneTimePrice: number;
  monthlyPrice: number;
}

const SideCart: React.FC<Props> = ({ oneTimePrice, monthlyPrice }) => {
  const { getFinalPrices, discounts } = useDiscounts();

  const { oneTime, monthly, monthlyBreakdown } = getFinalPrices(
    oneTimePrice,
    monthlyPrice
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow w-[340px]">
      <h3 className="text-lg font-semibold mb-4">Side Cart</h3>

      {/* Base Prices */}
      <div className="mb-4">
        <p className="flex justify-between">
          <span className="text-gray-600">Base One-time Price</span>
          <span className="font-medium">€{oneTimePrice}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-gray-600">Base Monthly Price</span>
          <span className="font-medium">€{monthlyPrice}</span>
        </p>
      </div>

      {/* Discounts */}
      {discounts.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Discounts</h4>
          {discounts.map((d) => (
            <p
              key={d.id}
              className="flex justify-between text-sm text-gray-700"
            >
              <span>{d.description || "Discount"}</span>
              <span>
                -{d.value}
                {d.type === "percentage" ? "%" : "€"}
              </span>
            </p>
          ))}
        </div>
      )}

      {/* Final Prices */}
      <div className="border-t pt-4">
        <p className="flex justify-between font-semibold">
          <span>Final One-time</span>
          <span>€{oneTime.toFixed(2)}</span>
        </p>
        <p className="flex justify-between font-semibold">
          <span>Final Monthly</span>
          <span>€{monthly.toFixed(2)}</span>
        </p>

        {monthlyBreakdown && (
          <div className="mt-3 text-sm text-gray-600">
            <p>
              First months:{" "}
              <strong>€{monthlyBreakdown.firstMonths.toFixed(2)}</strong>
            </p>
            <p>
              Remaining months:{" "}
              <strong>€{monthlyBreakdown.restMonths.toFixed(2)}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideCart;
