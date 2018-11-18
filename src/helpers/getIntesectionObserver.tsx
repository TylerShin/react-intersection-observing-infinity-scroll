export default function getIntersectionObserver():
  | typeof IntersectionObserver
  | null {
  if (
    typeof window !== "undefined" &&
    typeof IntersectionObserver === "undefined"
  ) {
    // TODO: Optimize polyfill logic
    console.log("REQUIRING POLYFILL FIRED");
    require("intersection-observer");
    return IntersectionObserver;
  }
  return null;
}
