import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

const baseStyles =
  'rounded-lg px-5 py-2 font-semibold transition-colors focus:outline-none focus:ring-2 font-sans min-h-[44px] min-w-[44px]';

const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400',
  secondary: 'bg-white text-blue-700 border border-blue-600 hover:bg-blue-50 focus:ring-blue-400',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-400',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
