// Imports first
import * as React from "react"
import { cn } from "@/lib/utils"

// Re-export shadcn/ui components for backward compatibility
export { Button } from '../ui/button';
export { 
  Card, 
  CardHeader, 
  CardContent as CardBody, // Map CardContent to CardBody 
  CardFooter,
  CardTitle,
  CardDescription 
} from '../ui/card';
export { Input } from '../ui/input';
export { Label } from '../ui/label';
export { 
  Dialog as Modal,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '../ui/dialog';
export { Skeleton as LoadingSpinner } from '../ui/skeleton';
export {
  AlertDialog as ConfirmDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../ui/alert-dialog';

// Export InputWithLabel for components that need label prop
export { InputWithLabel } from './InputWithLabel';

// Create a simple TextArea component using Input as base
export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
TextArea.displayName = "TextArea"
