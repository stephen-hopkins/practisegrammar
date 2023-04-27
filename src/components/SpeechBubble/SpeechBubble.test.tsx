import { render, screen } from "@/src/lib/test-utils";
import SpeechBubble from "./SpeechBubble";
import userEvent from "@testing-library/user-event";

describe("SpeechBubble", () => {
  it("renders", () => {
    render(<SpeechBubble className="test" text="Example test" show={true} type="original" onClick={() => {}} />);
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <SpeechBubble className="test" text="Example test" show={true} type="original" onClick={() => {}} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders with className", () => {
    const { container } = render(
      <SpeechBubble className="test" text="Example test" show={true} type="original" onClick={() => {}} />
    );
    expect(container.firstChild).toHaveClass("test");
  });

  it("shows text", () => {
    const { getByText } = render(
      <SpeechBubble className="test" text="Example test" show={true} type="original" onClick={() => {}} />
    );
    expect(getByText("Example test")).toBeInTheDocument();
  });

  it("does not show when show is false", () => {
    const { container } = render(
      <SpeechBubble className="test" text="Example test" show={false} type="original" onClick={() => {}} />
    );
    const text = screen.queryByText("Example test");
    expect(text).toBeNull();
  });

  it("fires event when clicked", async () => {
    const mockOnClick = jest.fn();
    const user = userEvent.setup();
    const { container } = render(
      <SpeechBubble className="test" text="Example test" show={true} type="original" onClick={mockOnClick} />
    );

    const text = screen.getByText("Example test");
    await user.click(text);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
