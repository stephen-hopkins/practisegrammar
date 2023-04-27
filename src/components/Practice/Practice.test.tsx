import { render, screen } from "@/src/lib/test-utils";
import Practice from "./Practice";
import userEvent from "@testing-library/user-event";
import useGenerate from "@/src/hooks/useGenerate";

const mutateSpy = jest.fn();
jest.mock("@/src/hooks/useGenerate", () => {
  return {
    __esModule: true,
    default: jest.fn(() => {
      return {
        mutate: mutateSpy,
        isLoading: false,
        isSuccess: true,
        data: {
          english: "Example english sentence",
          russian: "Example russian sentence",
        },
      };
    }),
  };
});

describe("Practice", () => {
  it("renders", () => {
    render(<Practice />);
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<Practice />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("calls onSubmit with concept and word when generate is clicked", async () => {
    const user = userEvent.setup();
    const { getByPlaceholderText, getByTestId, getByText } = render(<Practice />);
    const conceptDropdown = getByTestId("concept-dropdown");
    const wordInput = getByPlaceholderText("word to practice");
    const generateButton = getByText("Generate");

    await user.click(conceptDropdown);
    await user.click(getByText("accusative"));
    await user.type(wordInput, "hello");
    await user.click(generateButton);

    expect(useGenerate().mutate).toHaveBeenCalledWith({
      concept: "accusative",
      word: "hello",
    });
  });

  it("displays english sentence", async () => {
    const user = userEvent.setup();
    render(<Practice />);

    const generateButton = screen.getByText("Generate");
    await user.click(generateButton);

    expect(screen.getByText("Example english sentence")).toBeInTheDocument();
    const russianBubble = screen.queryByText('Example russian sentence')
    expect(russianBubble).toBeNull();
  });
});
