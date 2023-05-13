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

  // skipped for now because next-router-mock doesn't support next/navigation properly yet
  // https://github.com/scottrippey/next-router-mock/issues/67
  it.skip("clicking on logo takes you home", async () => {
    const user = userEvent.setup();
    mockRouter.push("/about");
    const { getByAltText } = render(<AppHeader />);

    const logo = getByAltText("application logo");
    await user.click(logo);

    expect(mockRouter.asPath).toBe("/");
  });
});
