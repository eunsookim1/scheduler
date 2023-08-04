import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment";

afterEach(cleanup);


describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });

  it("does something it is supposed to do", () => {
    //...
  });

  it("does something else it is supposed to do", () => {
    //...
  });

  it("confirms a new appointment", () => {
    //...
  });

  it("deletes an existing appointment", () => {
    //...
  });

  it("renders error message when in error", () => {
    //...
  });

  it("renders all the existing appointments correctly", () => {
    //...
  });

  it("user can create a new appointment", () => {
    //...
  });
});
