import React from 'react';
import { Link } from 'react-router-dom';
import { PageButton } from './PageButton';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  buttonText?: string;
  buttonLink?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  buttonText,
  buttonLink
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {icon && <div className="mb-4 text-6xl">{icon}</div>}
      <p className="text-xl text-[var(--primary-color)] mb-4 font-semibold">{title}</p>
      <p className="text-[var(--primary-color)] text-center max-w-md mb-6">{description}</p>
      {buttonText && buttonLink && (
        <Link to={buttonLink}>
          <PageButton page='explorer' />
        </Link>
      )}
    </div>
  );
};

