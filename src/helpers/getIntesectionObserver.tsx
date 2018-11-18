export default function getIntersectionObserver():
  | typeof IntersectionObserver
  | null {
  if (typeof window !== "undefined") {
    return IntersectionObserver;
  }
  return null;
}
