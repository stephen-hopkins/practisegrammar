import { render } from "@/src/lib/test-utils";
import AppHeader from "./AppHeader";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";

describe("AppHeader", () => {
  it("renders", () => {
    render(<AppHeader className="test" />);
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<AppHeader className="test" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders with className", () => {
    const { container } = render(<AppHeader className="test" />);
    expect(container.firstChild).toHaveClass("test");
  });

  it("clicking on logo takes you home", async () => {
    const user = userEvent.setup();
    mockRouter.push("/about");
    const { getByAltText } = render(<AppHeader className="test" />);

    const logo = getByAltText("application logo");
    await user.click(logo);

    expect(mockRouter.pathname).toBe("/");
  });
});
