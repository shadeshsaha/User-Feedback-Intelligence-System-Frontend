import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  color: string;
}

export default function Badge({ children, color }: BadgeProps) {
  return (
    <span
      className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${color}`}
    >
      {children}
    </span>
  );
}
