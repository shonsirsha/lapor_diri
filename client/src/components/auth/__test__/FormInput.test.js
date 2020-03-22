import React from "react";
import ReactDOM from "react-dom";
import FormInput from "../RegisterForm/FormInput";
import FormLabel from "../RegisterForm/FormLabel";

import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

it("Form elements rendered properly (no crash)", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FormInput></FormInput>, div);
  ReactDOM.render(<FormLabel></FormLabel>, div);
});

it("Form Input Renders with correct type and name", () => {
  const { getByTestId } = render(
    <FormInput inputType='text' inputName='nama_depan'></FormInput>
  );
  expect(getByTestId("formInput")).toHaveAttribute("type", "text");
  expect(getByTestId("formInput")).toHaveAttribute("name", "nama_depan");
});

it("Form Label Renders with correct type and name", () => {
  const { getByTestId } = render(
    <FormLabel htmlFor='nama_depan' text='Nama Depan'></FormLabel>
  );
  expect(getByTestId("formLabel")).toHaveAttribute("for", "nama_depan");
  expect(getByTestId("formLabel")).toHaveTextContent("Nama Depan");
});
