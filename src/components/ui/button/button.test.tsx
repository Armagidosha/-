import { Button } from "./button";
import renderer from "react-test-renderer"
import { render, fireEvent, screen } from "@testing-library/react";

describe("button component", () => {
  
  test("button without text", () => {
    const button = renderer
    .create(<Button />)
    .toJSON();
    expect(button).toMatchSnapshot();
  })

test("button with text", () => {
  const button = renderer
    .create(<Button text="Test Button" />)
    .toJSON();
    expect(button).toMatchSnapshot();
})

test("button is disabled", () => {
  const button = renderer
    .create(<Button disabled />)
    .toJSON();
    expect(button).toMatchSnapshot();
})

test("button is loading", () => {
  const button = renderer
    .create(<Button isLoader={true} />)
    .toJSON();
    expect(button).toMatchSnapshot();
})

test("button with callBack", () => {
  window.alert = jest.fn();

  render(<Button text="Testing Button" onClick={() => alert('Button Tested')}/>)
  const button = screen.getByText('Testing Button')
  fireEvent.click(button)
  expect(window.alert).toHaveBeenCalledWith('Button Tested')
})
})