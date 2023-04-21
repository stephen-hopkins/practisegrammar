import Home from "@/src/pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import React, { ReactNode } from "react";

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("Index", () => {
  it("renders", () => {
    render(wrapper({ children: <Home /> }));
  });
});
