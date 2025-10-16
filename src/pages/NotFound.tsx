import React from 'react';
import { EmptyState } from '@/components/atoms/EmptyState';

export const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center mx-auto w-full">
      <div className="m-10 w-full">
        <EmptyState
          title="404: Página não encontrada"
          description="A página que você está procurando não foi encontrada. Por favor, verifique se a URL está correta e tente novamente."
          icon="🔍"
          buttonText="Voltar para Home"
          buttonLink="/"
        />
      </div>
    </div>
  );
};
