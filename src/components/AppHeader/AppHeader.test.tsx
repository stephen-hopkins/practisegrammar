import { render } from "@/src/lib/test-utils";
import AppHeader from "./AppHeader";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";

describe("AppHeader", () => {
  it("renders", () => {
    render(<AppHeader />);
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<AppHeader />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("clicking on logo takes you home", async () => {
    const user = userEvent.setup();
    mockRouter.push("/about");
    const { getByAltText } = render(<AppHeader />);

    const logo = getByAltText("application logo");
    await user.click(logo);

    expect(mockRouter.pathname).toBe("/");
  });
});
