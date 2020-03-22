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

it("Renders with correct type and name", () => {
  const { getByTestId } = render(
    <FormInput inputType='text' inputName='nama_depan'></FormInput>
  );
  expect(getByTestId("formInput")).toHaveAttribute("type", "text");
});
