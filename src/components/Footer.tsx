
export const Footer = () => {
  return (
    <footer className="md:py-8 absolute w-full left-0 bottom-0 py-2 z-1   bg-gray-100/70 backdrop-blur-md  dark:bg-gray-900/40  dark:border-gray-800 text-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-1 md:mb-0">
            <p className=" font-semibold dark:text-gray-400">&copy; 2025 <span className="text-info font-bold">francois Adjaro</span>. Tous droits réservés.</p>
          </div>
          <div className=" space-x-6 hidden md:flex">
            <a href="#" className="text-gray-900 dark:text-gray-400 hover:text-blue-500 transition-colors">Mentions légales</a>
            <a href="#" className="text-gray-900 dark:text-gray-400 hover:text-blue-500 transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};