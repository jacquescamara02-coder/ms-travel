import { Children, cloneElement, isValidElement, useEffect, useState, type HTMLAttributes, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

function shutterNodes(nodes: ReactNode, reduced: boolean, offset = { value: 0 }): ReactNode {
  return Children.map(nodes, (node): ReactNode => {
    if (typeof node === "string" || typeof node === "number") {
      return String(node).split(/(\s+)/).map((word, wi) => {
        if (/^\s+$/.test(word)) return word;
        return <span className="shutter-word" key={wi}>{Array.from(word).map((char, ci) => {
          const delay = Math.min(offset.value++ * 0.025, 0.65);
          return <span className="shutter-char" key={ci}>
            <motion.span className="shutter-base" initial={reduced ? false : { opacity: 0, filter: "blur(8px)" }} whileInView={{ opacity: 1, filter: "blur(0px)" }} viewport={{ once: true, amount: 0.3 }} transition={{ delay, duration: reduced ? 0 : 0.7 }}>{char}</motion.span>
            {!reduced && ["top", "middle", "bottom"].map((slice, si) => <motion.span
              key={slice} aria-hidden="true" className={cn("shutter-slice", `shutter-${slice}`)}
              initial={{ x: si === 1 ? "100%" : "-100%", opacity: 0 }}
              whileInView={{ x: si === 1 ? "-100%" : "100%", opacity: [0, 1, 0] }}
              viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: delay + si * 0.1, ease: "easeInOut" }}
            >{char}</motion.span>)}
          </span>;
        })}</span>;
      });
    }
    if (isValidElement<{ children?: ReactNode }>(node)) {
      return cloneElement(node, undefined, shutterNodes(node.props.children, reduced, offset));
    }
    return node;
  });
}

export default function HeroText({ text, children, className }: { text?: string; children?: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return <span className={cn("shutter-text", className)}>{shutterNodes(children ?? text ?? "", hydrated && reduced === true)}</span>;
}

export function AnimatedHeading({ as: Tag = "h2", children, ...props }: HTMLAttributes<HTMLHeadingElement> & { as?: "h1" | "h2" }) {
  return <Tag {...props}><HeroText>{children}</HeroText></Tag>;
}