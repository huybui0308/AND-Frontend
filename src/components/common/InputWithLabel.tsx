import * as React from "react"
import { Input, InputProps } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export interface InputWithLabelProps extends Omit<InputProps, 'id'> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    const id = props.name || Math.random().toString(36).substr(2, 9)
    
    return (
      <div className="space-y-2">
        {label && <Label htmlFor={id}>{label}</Label>}
        <div className="relative">
          {icon && <div className="absolute left-3 top-3 text-muted-foreground">{icon}</div>}
          <Input
            id={id}
            ref={ref}
            className={icon ? `pl-10 ${className || ''}` : className}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    )
  }
)
InputWithLabel.displayName = "InputWithLabel"
