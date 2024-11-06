import React, { createContext, useContext, useState, useEffect } from "react";
import { lightTheme, darkTheme } from "../styles/themeStyles";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    // Elimina la parte que carga el tema de AsyncStorage
    // const loadTheme = async () => {
    //   const storedTheme = await AsyncStorage.getItem("theme");
    //   if (storedTheme) {
    //     setTheme(storedTheme === "dark" ? darkTheme : lightTheme);
    //   }
    // };
    // loadTheme();
    // Ahora siempre inicia con el tema claro o cualquier otro que prefieras
    setTheme(lightTheme); // El tema predeterminado es claro
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(newTheme); // Cambiar el tema sin usar AsyncStorage
    // Elimina la parte que guarda el tema en AsyncStorage
    // await AsyncStorage.setItem("theme", newTheme === darkTheme ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
