import { useTheme } from "@/lib/theme";
import { MoonStar, Sun } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="relative cursor-pointer inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors bg-gradient-to-r from-blue-500 to-purple-500"
    >
      <Sun
        className={`stroke-amber-50 absolute transition-all duration-500 ${
          theme === "dark"
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
      />
      <MoonStar
        className={`absolute transition-all duration-500 ${
          theme === "light"
            ? "-rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
      />
    </button>
  );
};
