import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        Baixa: "text-lime-950 text-xs bg-lime-300/60 border-2 border-lime-300 dark:bg-lime-950/60 dark:text-lime-200 dark:border-lime-800",
        Media: "text-amber-950 text-xs bg-amber-300/60 border-2 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-800",
        Alta: "text-red-950 text-xs bg-red-300/60 border-2 border-red-300 dark:bg-red-950/60 dark:text-red-200 dark:border-red-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
