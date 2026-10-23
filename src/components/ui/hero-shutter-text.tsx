import { Children, cloneElement, isValidElement, useEffect, useState, type HTMLAttributes, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

function swingNodes(nodes: ReactNode, reduced: boolean, offset = { value: 0 }): ReactNode {
  return Children.map(nodes, (node): ReactNode => {
    if (typeof node === "string" || typeof node === "number") {
      return String(node).split(/(\s+)/).map((word, wi) => {
        if (/^\s+$/.test(word)) return word;
        return <span className="letter-swing-word" key={wi}>{Array.from(word).map((char, ci) => {
          const delay = offset.value++ * 0.05;
          return <motion.span
            className="letter-swing-char" key={ci}
            initial={reduced ? false : { rotate: 90, opacity: 0 }}
            whileInView={{ rotate: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 250, damping: 12, mass: 1, delay }}
          >{char}</motion.span>;
        })}</span>;
      });
    }
    if (isValidElement<{ children?: ReactNode }>(node)) {
      return cloneElement(node, undefined, swingNodes(node.props.children, reduced, offset));
    }
    return node;
  });
}

export default function HeroText({ text, children, className }: { text?: string; children?: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return <span className={cn("letter-swing-text", className)}>{swingNodes(children ?? text ?? "", hydrated && reduced === true)}</span>;
}

export function AnimatedHeading({ as: Tag = "h2", children, ...props }: HTMLAttributes<HTMLHeadingElement> & { as?: "h1" | "h2" }) {
  return <Tag {...props}><HeroText>{children}</HeroText></Tag>;
}