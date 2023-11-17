import { ReactElement } from "react"
import { ElementStates } from "./element-states"

export type AnimQueue = {
  index: number | null
  showCircle: boolean
  element: ReactElement | null
  isHead?: boolean
}

export type Loading = {
  [key: string]: boolean
}