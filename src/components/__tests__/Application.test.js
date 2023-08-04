import React from "react";

import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});


// I no longer use .then anymore and have an await in front of it.
// When i don't have any result from the function I don't necessarily have to capture anything with the await. Not assigning a const or variable.
// I'm returning a promise in a regular JS function.
// await only works for asynchronous functions.