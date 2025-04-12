
import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark-theme' | 'light-theme' | 'purple-theme' | 'green-theme';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if theme is saved in localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'dark-theme';
  });

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem('theme', theme);
    
    // Remove all theme classes first
    document.documentElement.classList.remove('dark-theme', 'light-theme', 'purple-theme', 'green-theme');
    
    // Add the current theme class
    document.documentElement.classList.add(theme);
    
    // Update TradingView widget theme if it exists
    const isDarkMode = theme !== 'light-theme';
    const tradingViewTheme = isDarkMode ? 'dark' : 'light';
    
    // Set a data attribute on the document for other components to use
    document.documentElement.setAttribute('data-theme', tradingViewTheme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
