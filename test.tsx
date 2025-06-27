import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

describe("Home", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("renders an empty basket", () => {
    const basketButton = screen.getByRole("button", {
      name: /Basket:/i,
    });
    expect(basketButton).toHaveTextContent("Basket: 0 items");
  });

  it("renders a basket with 1 item", async () => {
    const buttons = screen.getAllByRole("button", {
      name: /Add to basket/i,
    });
    await userEvent.click(buttons[0]);
    const basketButton = screen.getByRole("button", {
      name: /Basket:/i,
    });
    expect(basketButton).toHaveTextContent(/Basket: 1 item$/);
    // Check that Item 1 count is 1
    expect(screen.getByText(/Item 1 count: 1/)).toBeInTheDocument();
  });

  it("renders a basket with 1 of item 1 and 2 of item 2", async () => {
    const buttons = screen.getAllByRole("button", {
      name: /Add to basket/i,
    });
    await userEvent.click(buttons[0]); // Item 1
    await userEvent.click(buttons[1]); // Item 2
    await userEvent.click(buttons[1]); // Item 2 again
    const basketButton = screen.getByRole("button", {
      name: /Basket:/i,
    });
    expect(basketButton).toHaveTextContent(/Basket: 3 items$/);
    // Check that Item 1 count is 1 and Item 2 count is 2
    expect(screen.getByText(/Item 1 count: 1/)).toBeInTheDocument();
    expect(screen.getByText(/Item 2 count: 2/)).toBeInTheDocument();
  });
});
