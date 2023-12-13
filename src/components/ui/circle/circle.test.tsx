import { Circle } from "./circle";
import renderer from "react-test-renderer"
import { ElementStates } from "../../../types/element-states";

describe("circle component", () => {

  test("circle without letters", () => {
    const circle = renderer
    .create(<Circle />)
    .toJSON()
    expect(circle).toMatchSnapshot()
  })

  test("circle with letters", () => {
    const circle = renderer
    .create(<Circle letter="abc"/>)
    .toJSON()
    expect(circle).toMatchSnapshot()
  })

  test("circle with head", () => {
    const circle = renderer
    .create(<Circle head="head"/>)
    .toJSON()
    expect(circle).toMatchSnapshot()
  })

  test("circle with head & props at the head", () => {
    const circle = renderer
    .create(<Circle head={<Circle />}/>)
    .toJSON()
    expect(circle).toMatchSnapshot()
  })

  test("circle with tail", () => {
    const circle = renderer
    .create(<Circle tail="tail"/>)
    .toJSON()
    expect(circle).toMatchSnapshot()
  })

  test("circle with tail & props at the tail", () => {
    const circle = renderer
    .create(<Circle tail={<Circle />}/>)
    .toJSON()
    expect(circle).toMatchSnapshot()
  })

  test("citcle with index", () => {
    const circle = renderer
    .create(<Circle index={1} />)
    .toJSON()
    expect(circle).toMatchSnapshot()
  })
  
  test("circle with prop isSmall", () => {
    const circle = renderer
    .create(<Circle isSmall={true} />)
    .toJSON()
    expect(circle).toMatchSnapshot()
  })

  test("circle with Default state", () => {
    const circle = renderer
    .create(<Circle state={ElementStates.Default}/>)
    .toJSON()
    expect(circle).toMatchSnapshot()
  })

  test("circle with Changing state", () => {
    const circle = renderer
    .create(<Circle state={ElementStates.Changing}/>)
    .toJSON()
    expect(circle).toMatchSnapshot()
  })

  test("circle with Modified state", () => {
    const circle = renderer
    .create(<Circle state={ElementStates.Modified}/>)
    .toJSON()
    expect(circle).toMatchSnapshot()
  })
})