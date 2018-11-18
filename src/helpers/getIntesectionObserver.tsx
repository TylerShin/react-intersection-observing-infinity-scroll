export default function getIntersectionObserver():
  | typeof IntersectionObserver
  | null {
  if (
    typeof window !== "undefined" &&
    typeof IntersectionObserver === "undefined"
  ) {
    // TODO: Optimize polyfill logic
    console.log("REQUIRING POLYFILL FIRED");
    return IntersectionObserver;
  }
  return null;
}
