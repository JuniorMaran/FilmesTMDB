export const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center mx-auto max-w-md">
      <h1 className="text-4xl font-bold">404: Página não encontrada</h1>
      <p className="text-xl mt-4">
        A página que você está procurando não foi encontrada.
        Por favor, verifique se a URL está correta e tente novamente.
      </p>
    </div>
  );
};
