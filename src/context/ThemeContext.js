import React, { createContext, useContext, useState, useEffect } from "react";
import { lightTheme, darkTheme } from "../styles/themeStyles";
import { auth, db } from "../../credenciales";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadThemeFromFirestore = async () => {
      const userInfo = auth.currentUser;
      if (userInfo) {
        const userDocRef = doc(db, "usuarios", userInfo.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          const storedTheme = data.modo;
          if (storedTheme === "dark") {
            setTheme(darkTheme);
          } else {
            setTheme(lightTheme);
          }
        }
      }
      setLoading(false);
    };

    loadThemeFromFirestore();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(newTheme);

    const userInfo = auth.currentUser;
    if (userInfo) {
      const userDocRef = doc(db, "usuarios", userInfo.uid);
      await updateDoc(userDocRef, {
        modo: newTheme === darkTheme ? "dark" : "light",
      });
    }
  };

  if (loading) {
    return <></>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
