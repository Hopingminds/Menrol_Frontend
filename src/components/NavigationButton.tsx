"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavigationButtonProps {
  path: string;
  label: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ path, label }) => {
  const currentPath = usePathname();
  const isActive = currentPath === path;

  return (
    <Link href={path}>
      <p
        className={`cursor-pointer ${
          isActive ? "text-blue-700 font-bold underline" : "hover:text-blue-500"
        }`}
      >
        {label}
      </p>
    </Link>
  );
};

export default NavigationButton;
