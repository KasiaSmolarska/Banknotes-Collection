import React from "react";
import { render } from "@testing-library/react";

import { Icon } from "../Icon";

describe("Icon tests", () => {
  it("should display icon properly", () => {
    const { container } = render(<Icon icon="MenuIcon" fill="red" width="30" height="40" />);
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("width")).toBe("30");
    expect(svg?.getAttribute("height")).toBe("40");

    const paths = svg?.querySelectorAll("path, circle");

    expect(paths?.[0]?.getAttribute("fill")).toBe("red");
  });
});
