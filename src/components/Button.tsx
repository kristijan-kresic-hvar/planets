import { useState, memo, ReactNode } from 'react';

type ButtonProps = {
  onClick: () => void;
  isActive?: boolean;
  activeBackground?: string;
  buttonNumber?: number;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children: ReactNode;
};

const Button = memo(
  ({
    onClick,
    isActive = false,
    activeBackground,
    buttonNumber,
    type = 'button',
    disabled = false,
    children,
  }: ButtonProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const formattedButtonNumber = buttonNumber?.toString().padStart(2, '0');
    const buttonStyle = {
      backgroundColor: isActive ? activeBackground : 'transparent',
      ...(isHovered &&
        !isActive && { backgroundColor: 'var(--button-hover-background)' }),
      transition: 'background-color 0.2s ease-in-out',
    };

    return (
      <button
        style={buttonStyle}
        type={type}
        disabled={disabled}
        className="flex justify-start items-center max-w-[21.875rem] w-full py-[0.75rem] px-[1.75rem] font-bold leading-[1.6rem] tracking-[0.2rem] uppercase text-[0.5625rem] lg:text-[0.75rem] font-spartan text-white border border-[rgba(255,255,255,0.2)] hover:${buttonHoverBackgroundColor}"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {formattedButtonNumber && (
          <span className="text-[rgba(255,255,255,0.5)] mr-[1.75rem]">
            {formattedButtonNumber}
          </span>
        )}
        {children}
      </button>
    );
  }
);

export default Button;
