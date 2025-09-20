import React, { useState } from "react";
import { useDiscounts } from "../context/DiscountContext";
import { v4 as uuid } from "uuid";
import type { Discount, DiscountType, PriceType } from "@/types/discount";

interface Props {
  editDiscount?: Discount;
  onClose: () => void;
}

const DiscountForm: React.FC<Props> = ({ editDiscount, onClose }) => {
  const { addDiscount, editDiscount: updateDiscount } = useDiscounts();

  const [priceType, setPriceType] = useState<PriceType>(
    editDiscount?.priceType || "oneTime"
  );
  const [type, setType] = useState<DiscountType>(
    editDiscount?.type || "percentage"
  );
  const [value, setValue] = useState<number>(editDiscount?.value || 0);
  const [duration, setDuration] = useState<number>(editDiscount?.duration || 0);
  const [description, setDescription] = useState(
    editDiscount?.description || ""
  );

  const handleSubmit = () => {
    const discount: Discount = {
      id: editDiscount?.id || uuid(),
      type,
      priceType,
      value,
      duration: priceType === "monthly" ? duration : undefined,
      description,
    };

    if (editDiscount) {
      updateDiscount(discount);
    } else {
      addDiscount(discount);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl shadow-lg w-[420px] p-6">
        <h2 className="text-lg font-semibold mb-4">
          {editDiscount ? "Edit Discount" : "Add Discount"}
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Label</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Applies To</label>
          <div className="flex gap-2">
            <button
              type="button"
              className={`flex-1 py-2 rounded-lg border ${
                priceType === "oneTime"
                  ? "bg-[#00B4D8] text-white"
                  : " text-gray-700"
              }`}
              onClick={() => setPriceType("oneTime")}
            >
              One-Time
            </button>
            <button
              type="button"
              className={`flex-1 py-2 rounded-lg border ${
                priceType === "monthly"
                  ? "bg-[#00B4D8] text-white"
                  : " text-gray-700"
              }`}
              onClick={() => setPriceType("monthly")}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="mb-4 flex gap-2">
          <select
            className="w-1/3 border rounded-lg p-2"
            value={type}
            onChange={(e) => setType(e.target.value as DiscountType)}
          >
            <option value="percentage">%</option>
            <option value="amount">€</option>
          </select>
          <input
            type="number"
            className="flex-1 border rounded-lg p-2"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
        </div>

        {priceType === "monthly" && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Duration (months)
            </label>
            <input
              type="number"
              className="w-full border rounded-lg p-2"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-lg border text-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-[#00B4D8] text-white"
            onClick={handleSubmit}
          >
            {editDiscount ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountForm;
