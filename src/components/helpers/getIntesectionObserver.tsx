export default function getIntersectionObserver():
  | typeof IntersectionObserver
  | null {
  if (typeof window !== "undefined") {
    // TODO: Optimize polyfill logic
    require("intersection-observer");
    return IntersectionObserver;
  }
  return null;
}
