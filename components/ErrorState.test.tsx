import { render, screen } from "@testing-library/react";
import { PackageX } from "lucide-react";
import ErrorState from "@/components/ErrorState";

describe("ErrorState", () => {
  it("renders the default title and the given message", () => {
    render(<ErrorState message="Request failed" />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Request failed")).toBeInTheDocument();
  });

  it("renders a custom title when provided", () => {
    render(<ErrorState title="Product not found" message="404" />);
    expect(screen.getByText("Product not found")).toBeInTheDocument();
  });

  it("always renders a link back home", () => {
    render(<ErrorState message="oops" />);
    expect(screen.getByText("← Back to home")).toHaveAttribute("href", "/");
  });

  it("does not render the digest when none is given", () => {
    render(<ErrorState message="oops" />);
    expect(screen.queryByText(/Error ID:/)).not.toBeInTheDocument();
  });

  it("renders the digest when given", () => {
    render(<ErrorState message="oops" digest="abc123" />);
    expect(screen.getByText("Error ID: abc123")).toBeInTheDocument();
  });

  it("does not render a retry button when onRetry is not given", () => {
    render(<ErrorState message="oops" />);
    expect(
      screen.queryByRole("button", { name: "Try again" })
    ).not.toBeInTheDocument();
  });

  it("renders a retry button that calls onRetry when clicked", () => {
    const onRetry = jest.fn();
    render(<ErrorState message="oops" onRetry={onRetry} />);
    screen.getByRole("button", { name: "Try again" }).click();
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("renders the custom icon when provided", () => {
    const { container } = render(
      <ErrorState message="oops" icon={PackageX} />
    );
    expect(container.querySelector(".lucide-package-x")).not.toBeNull();
  });
});
