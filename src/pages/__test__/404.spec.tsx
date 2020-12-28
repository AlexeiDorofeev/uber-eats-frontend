import { waitFor } from "@testing-library/react";
import React from "react";
import { render } from "../../test-utils";
import { NotFound } from "../404";

describe("<NotFound/>", () => {
  it("renders OK", async () => {
    render(<NotFound />);
    await waitFor(() => {
      expect(document.title).toBe("Not Found | Uber Eats");
    });
  });
});
