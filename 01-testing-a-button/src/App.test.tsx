import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Button", () => {
  test("should start in HotPink state", () => {
    render(<App />);
    const buttonElement = screen.getByRole("button", {
      name: "Change to CornflowerBlue",
    });
    expect(buttonElement).toHaveStyle({ backgroundColor: "HotPink" });
  });

  test("should change to color CornflowerBlue on click", () => {
    render(<App />);
    const buttonElement = screen.getByRole("button", {
      name: "Change to CornflowerBlue",
    });
    fireEvent.click(buttonElement);
    expect(buttonElement).toHaveStyle({ backgroundColor: "CornflowerBlue" });
    expect(buttonElement.textContent).toBe("Change to HotPink");
  });
});
