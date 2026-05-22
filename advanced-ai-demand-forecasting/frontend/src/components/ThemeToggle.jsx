import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="rounded-2xl bg-yellow-100 p-4 text-yellow-700 dark:bg-slate-800 dark:text-yellow-300">
      {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
    </button>
  );
};

export default ThemeToggle;