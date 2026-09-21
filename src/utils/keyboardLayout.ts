import { Dimensions, KeyboardEvent } from "react-native";
import { measureKeyboardOverlap } from "./keyboardOverlap";

export { measureKeyboardOverlap };

export function getKeyboardOverlapHeight(
  event: KeyboardEvent,
  windowHeight: number,
): number {
  const screenHeight = Dimensions.get("screen").height;
  return measureKeyboardOverlap({
    reportedHeight: event.endCoordinates?.height ?? 0,
    keyboardScreenY: event.endCoordinates?.screenY ?? screenHeight,
    screenHeight,
    windowHeight,
  });
}
