import React from "react";

import { render, cleanup, waitForElement, waitForElementToBeRemoved, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";
import Appointment from "components/Appointment";




afterEach(cleanup);

// it("defaults to Monday and changes the schedule when a new day is selected", () => {
//   const { getByText } = render(<Application />);

//   return waitForElement(() => getByText("Monday")).then(() => {
//     fireEvent.click(getByText("Tuesday"));
//     expect(getByText("Leopold Silvers")).toBeInTheDocument();
//   });
// });

// Personal note:
// I no longer use .then anymore and have an await in front of it.
// When i don't have any result from the function I don't necessarily have to capture anything with the await. Not assigning a const or variable.
// I'm returning a promise in a regular JS function.
// await only works for asynchronous functions.

describe("Application", () => {

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    // convenience function, assumes a container. It has container built into it.

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });


  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];


    const empty = getByAltText(appointment, "Add")
    fireEvent.click(empty);

    // const input = getByPlaceholderText(appointment, /enter student name/i)
    const input = getByPlaceholderText(appointment, "Enter Student Name")

    const event = { target: { value: "Lydia Miller-Jones" } };
    fireEvent.change(input, event);

    const interviewer = getByAltText(appointment, "Sylvia Palmer")
    fireEvent.click(interviewer);

    fireEvent.click(getByText(appointment, "Save"));

    const saving = getByText(appointment, "Saving");
    expect(saving).toBeInTheDocument();


    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));

    await waitForElement(() => queryByText(container, "Lydia Miller-Jones"));
    // debug();

    const studentNameInSection = queryByText(appointment, "Lydia Miller-Jones");
    // 1st: parameter is the starting point,
    // 2nd: what I'm looking for

    expect(studentNameInSection).toBeInTheDocument();

    const editIcon = queryByAltText(appointment, "Edit");
    expect(editIcon).toBeInTheDocument();

    const deleteIcon = queryByAltText(appointment, "Delete");
    expect(deleteIcon).toBeInTheDocument();


    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  })

})