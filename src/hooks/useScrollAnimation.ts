import { useRef } from "react";
import { useInView } from "framer-motion";

export function useScrollAnimation(
  options: { once?: boolean; margin?: any } = {}
) {
  const { once = true, margin = "-80px" } = options;
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin } as any);
  return { ref, inView };
}
