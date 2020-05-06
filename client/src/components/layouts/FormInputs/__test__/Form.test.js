import React from "react";
import ReactDOM from "react-dom";
import FormInput from "../FormInput";
import FormLabel from "../FormLabel";

import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import puppeteer from "puppeteer";

afterEach(cleanup);
jest.setTimeout(30000);

it("Form elements rendered properly (no crash)", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FormInput></FormInput>, div);
  ReactDOM.render(<FormLabel></FormLabel>, div);
});

it("Form Input Renders with correct type and name", () => {
  const { getByTestId } = render(
    <FormInput inputType="text" inputName="nama_depan"></FormInput>
  );
  expect(getByTestId("formInput")).toHaveAttribute("type", "text");
  expect(getByTestId("formInput")).toHaveAttribute("name", "nama_depan");
});

it("Updates onn change", () => {
  const { getByTestId } = render(
    <FormInput inputType="text" inputName="nama_depan"></FormInput>
  );

  fireEvent.change(getByTestId("formInput"), {
    target: { value: "hello world" },
  });

  expect(getByTestId("formInput").value).toBe("hello world");
});

it("Form Label Renders with correct htmlfor and text content", () => {
  const { getByTestId } = render(
    <FormLabel htmlFor="nama_depan" text="Nama Depan"></FormLabel>
  );
  expect(getByTestId("formLabel")).toHaveAttribute("for", "nama_depan");
  expect(getByTestId("formLabel")).toHaveTextContent("Nama Depan");
});

// test("btn clicked", async () => {
//   const browser = await puppeteer.launch({
//     headless: false,
//     slowMo: 150,
//     args: ["--window-size=1920,1080"],
//   });

//   const page = await browser.newPage();
//   await page.goto("http://localhost:3000/");
//   await page.click("#testbtn");
// });
