import React from "react";

import { render, cleanup, waitForElement, waitForElementToBeRemoved, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText, getByDisplayValue } from "@testing-library/react";

import Application from "components/Application";
import Appointment from "components/Appointment";

import axios from "axios";


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
    // 1. Render the Application
    const { getByText } = render(<Application />);
    // convenience function, assumes a container. It has container built into it.

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });


  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
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

    ////////////////////////////////////////////////////////////////


  })


  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"))

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    // 3. Click the "Delete" button on the booked appointment.
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Delete the appointment?"));

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"))

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" has the text "2 spot available"
    const monday = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    )

    expect(getByText(monday, "2 spots remaining")).toBeInTheDocument();

    debug();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"))

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    // 3. Click the "Edit" button on the booked appointment.
    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. Check that the previous appointment is shown.
    debug();
    expect(getByDisplayValue(appointment, "Archie Cohen")).toBeInTheDocument();

    // 5. Change the existing appointment.
    const input = getByDisplayValue(appointment, "Archie Cohen")
    const event = { target: { value: "Lydia Miller-Jones" } };
    fireEvent.change(input, event);

    // changing the interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6.. Click the "Save" button on the confirmation.
    fireEvent.click(getByText(appointment, "Save"))

    // 6. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 7. Wait until the edited appointment is displayed.
    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));

    // 8. Check for Lydia Miller Jones in the document
    expect(queryByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();

    // 9. Check that the DayListItem with the text "Monday" has the text "1 spot available"
    const monday = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    )

    expect(getByText(monday, "1 spot remaining")).toBeInTheDocument();

    debug();
  });

  /* test number five */
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
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

    debug();

    await waitForElement(() => getByText(appointment, "Unable to save"));

    // await waitForElement(() => queryByText(container, "Lydia Miller-Jones"));
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    // 1. Render the Application
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"))

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    // 3. Click the "Delete" button on the booked appointment.
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Delete the appointment?"));

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"))

    debug();
    // 6. Check that the element with the text "Unable to delete" is displayed.
    await waitForElement(() => getByText(appointment, "Unable to delete"));

    // expect(getByText(appointment, "Unable to delete")).toBeInTheDocument();

  })


})