import Link from 'next/link';
import React from 'react';

interface NavigationButtonProps {
  path: string;
  label: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ path, label }) => {
  return (
    <Link href={path}>
      <p className="hover:text-blue-500 cursor-pointer">
        {label}
      </p>
    </Link>
  );
};

export default NavigationButton;
