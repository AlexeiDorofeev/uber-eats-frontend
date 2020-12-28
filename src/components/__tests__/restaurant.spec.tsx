import { render } from "@testing-library/react";
import React from "react";
import { Restaurant } from "../../components/restaurant";
import { BrowserRouter as Router } from "react-router-dom";

describe("<Restaurant />", () => {
  it("renders Ok with props", () => {
    const { debug, getByText, container } = render(
      <Router>
        <Restaurant
          id="1"
          coverImg="x"
          name="nameTest"
          categoryName="catTest"
        />
      </Router>
    );
    getByText("nameTest");
    getByText("catTest");
    expect(container.firstChild).toHaveAttribute("href", "/restaurants/1");
  });
});
