import DiscountForm from "@/components/DiscountForm";
import DiscountList from "@/components/DiscountList";
import SideCart from "@/components/SideCart";
import { DiscountProvider } from "@/context/DiscountContext";
import { useState } from "react";

const HomePage = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <DiscountProvider>
      <div className="min-h-screen  flex gap-6 p-6">
        <div className="flex-1 space-y-4">
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 rounded bg-[#00B4D8] text-white cursor-pointer"
          >
            Add Discount
          </button>
          <DiscountList />
        </div>

        <SideCart oneTimePrice={1000} monthlyPrice={100} />

        {showForm && <DiscountForm onClose={() => setShowForm(false)} />}
      </div>
    </DiscountProvider>
  );
};

export default HomePage;
