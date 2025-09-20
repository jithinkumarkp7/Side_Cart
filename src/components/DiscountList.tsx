import React, { useState } from "react";
import DiscountForm from "./DiscountForm";
import { useDiscounts } from "@/context/DiscountContext";
import { Pencil, Trash2 } from "lucide-react";

const DiscountList: React.FC = () => {
  const { discounts, deleteDiscount } = useDiscounts();
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingDiscount = discounts.find((d) => d.id === editingId);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">Applied Discounts</h3>
      {discounts.length === 0 && (
        <p className="text-gray-500">No discounts added yet.</p>
      )}

      <ul className="space-y-2">
        {discounts.map((d) => (
          <li
            key={d.id}
            className="flex justify-between items-center border rounded-lg p-2"
          >
            <div>
              <p className="font-medium">{d.description || "Discount"}</p>
              <p className="text-sm text-gray-600">
                {d.value}
                {d.type === "percentage" ? "%" : "€"} • {d.priceType}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className="text-[#00B4D8] hover:text-[#00B4D8] cursor-pointer"
                onClick={() => setEditingId(d.id)}
              >
                <Pencil size={18} />
              </button>
              <button
                className="text-red-600 hover:text-red-800 cursor-pointer"
                onClick={() => deleteDiscount(d.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingDiscount && (
        <DiscountForm
          editDiscount={editingDiscount}
          onClose={() => setEditingId(null)}
        />
      )}
    </div>
  );
};

export default DiscountList;
