import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { DiscountProvider } from "../context/DiscountContext";
import SideCart from "@/components/SideCart";
import DiscountForm from "@/components/DiscountForm";

describe("Discount Flow", () => {
  test("adds a one-time discount and updates side cart", () => {
    render(
      <DiscountProvider>
        <DiscountForm onClose={() => {}} />
        <SideCart oneTimePrice={1000} monthlyPrice={100} />
      </DiscountProvider>
    );

    fireEvent.change(screen.getByLabelText(/Discount Value/i), {
      target: { value: "10" },
    });
    fireEvent.click(screen.getByText(/Add/i));

    expect(screen.getByText("€900"));
  });
});
