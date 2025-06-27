import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import { act } from "react-dom/test-utils";

describe("Home", () => {
  it("renders an empty basket", () => {
    act(() => {
      render(<Home />);
    });

    const basketButton = screen.getByRole("button", {
      name: /Basket:/i,
    });

    expect(basketButton).toHaveTextContent("Basket: 0 items");
  });

  it("renders a basket with 1 item", async () => {
    act(() => {
      render(<Home />);
    });

    const buttons = screen.getAllByRole("button", {
      name: /Add to basket/i,
    });

    await act(async () => {
      await buttons[0].click();
    });

    const basketButton = screen.getByRole("button", {
      name: /Basket:/i,
    });

    expect(basketButton).toHaveTextContent(/Basket: 1 item$/);
  });

  it("renders a basket with 1 of item 1 and 2 of item 2", async () => {
    act(() => {
      render(<Home />);
    });

    const buttons = screen.getAllByRole("button", {
      name: /Add to basket/i,
    });

    await act(async () => {
      await buttons[0].click();
    });
    await act(async () => {
      await buttons[1].click();
    });
    await act(async () => {
      await buttons[1].click();
    });

    const basketButton = screen.getByRole("button", {
      name: /Basket:/i,
    });

    expect(basketButton).toHaveTextContent(/Basket: 3 items$/);
  });
});
