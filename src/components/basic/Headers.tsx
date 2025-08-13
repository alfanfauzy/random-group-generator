import { Users } from "lucide-react";

const Headers = () => {
  return (
    <div className="text-center mb-6 md:mb-8">
      <div className="flex items-center justify-center gap-3 mb-3 md:mb-4">
        <div className="p-2.5 md:p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
          <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </div>
        <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
          Acak Kelompok
        </h1>
      </div>
      <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-xl md:max-w-2xl mx-auto px-2">
        Ketik nama, biarin mesin yang ngacak! Dapetin Kelompok random dengan
        animasi keren dan hasil seru.
      </p>
    </div>
  );
};

export default Headers;
