import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={` mx-5 px-5 py-4 rounded-xl bg-primary focus:outline-none transition cursor-pointer  text-1xlduration-300 text-white ${
        disabled ? "bg-gray-400 cursor-not-allowed" : "bg-primary  "
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
