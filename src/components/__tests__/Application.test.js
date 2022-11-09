import React from "react";
import { waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText, getByClass, getByTestId, queryByTestId } from "@testing-library/react";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("App", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"))
      expect(getByText("Leopold Silvers")).toBeInTheDocument()
    })
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"))
    const appointments = getAllByTestId(container, "appointment");
    const appointment = getAllByTestId(container, "appointment")[0]

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(container, "Saving")).toBeInTheDocument()

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"))

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument()
  })

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();

    fireEvent.click(getByTestId(container, "confirm"));

    expect(getByText(container, "Deleting")).toBeInTheDocument()

    await waitForElement(() => queryByAltText(appointment, "Add"))

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument()
  });

})
