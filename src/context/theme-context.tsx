import React, { createContext, ReactNode, useContext, useState } from "react";

type TThemeMode = "dark" | "light";

interface IThemeContext {
  theme: TThemeMode;
  handleThemeChange: () => void;
}

interface IThemeProps {
  children?: ReactNode;
}

const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

/**
 * Context to provide theme-related data and functions.
 */
export const ThemeContext = createContext<IThemeContext | null>(null);

/**
 * ThemeProvider component that provides theme context to its children.
 * 
 * Manages the current theme state and provides a function to toggle between light and dark themes.
 * 
 * @param {IThemeProps} props - The props for the component.
 * @param {ReactNode} [props.children] - Child components that will have access to the theme context.
 * 
 * @returns {JSX.Element} - A JSX element wrapping its children with the theme context provider.
 */
const ThemeProvider: React.FC<IThemeProps> = ({ children }) => {
  const [theme, setTheme] = useState<TThemeMode>(isDark ? "dark" : "light");

  /**
   * Toggles the theme between light and dark modes.
   */
  const handleThemeChange = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};


/**
 * Custom hook to access the theme context.
 * 
 * @throws {Error} Throws an error if the hook is used outside of the ThemeProvider.
 * 
 * @returns {IThemeContext} - The theme context object containing the current theme and a function to change the theme.
 */
export const useThemeContext = (): IThemeContext => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};


export default ThemeProvider;
