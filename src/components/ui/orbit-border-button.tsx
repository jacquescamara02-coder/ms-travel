import { forwardRef } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Local equivalent of Originkit's orbit border; shares the site's button API. */
export const OrbitBorderButton = forwardRef<HTMLButtonElement, ButtonProps>(function OrbitBorderButton({ className, ...props }, ref) {
  return <Button ref={ref} className={cn("orbit-border-btn", className)} {...props} />;
});