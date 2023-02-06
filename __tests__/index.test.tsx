import Home from "@/pages";
import {render} from "@testing-library/react";

describe('Index', () => {
  it('renders', () => {
    render(<Home />);
  })
})