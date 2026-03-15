import { useRef } from "react";
import { useInView } from "framer-motion";

export function useScrollAnimation(
  options: { once?: boolean; margin?: string } = {}
) {
  const { once = true, margin = "-80px" } = options;
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin });
  return { ref, inView };
}
