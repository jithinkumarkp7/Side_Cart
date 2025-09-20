/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState } from "react";
import type { Discount } from "@/types/discount";
import { calculateNewPrice } from "@/utils/calculations";

interface DiscountContextType {
  discounts: Discount[];
  addDiscount: (discount: Discount) => void;
  editDiscount: (discount: Discount) => void;
  deleteDiscount: (id: string) => void;
  getFinalPrices: (
    oneTimePrice: number,
    monthlyPrice: number
  ) => {
    oneTime: number;
    monthly: number;
    monthlyBreakdown?: { firstMonths: number; restMonths: number };
  };
}

const DiscountContext = createContext<DiscountContextType | undefined>(
  undefined
);

export const DiscountProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);

  const addDiscount = (discount: Discount) => {
    setDiscounts((prev) => [...prev, discount]);
  };

  const editDiscount = (updated: Discount) => {
    setDiscounts((prev) =>
      prev.map((d) => (d.id === updated.id ? updated : d))
    );
  };

  const deleteDiscount = (id: string) => {
    setDiscounts((prev) => prev.filter((d) => d.id !== id));
  };

  const getFinalPrices = (oneTimePrice: number, monthlyPrice: number) => {
    return calculateNewPrice(oneTimePrice, monthlyPrice, discounts);
  };

  return (
    <DiscountContext.Provider
      value={{
        discounts,
        addDiscount,
        editDiscount,
        deleteDiscount,
        getFinalPrices,
      }}
    >
      {children}
    </DiscountContext.Provider>
  );
};

export const useDiscounts = () => {
  const context = useContext(DiscountContext);
  if (!context)
    throw new Error("useDiscounts must be used within DiscountProvider");
  return context;
};
