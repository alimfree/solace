import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ThemeState {
  isDarkMode: boolean;
}

interface ThemeActions {
  toggleTheme: () => void;
  setTheme: (isDarkMode: boolean) => void;
}

type ThemeStore = ThemeState & ThemeActions;

export const useThemeStore = create<ThemeStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        isDarkMode: false,

        // Actions
        toggleTheme: () => {
          const currentMode = get().isDarkMode;
          const newMode = !currentMode;

          set({ isDarkMode: newMode });

          // Apply theme to document
          if (typeof window !== 'undefined') {
            document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
          }
        },

        setTheme: (isDarkMode) => {
          set({ isDarkMode });

          // Apply theme to document
          if (typeof window !== 'undefined') {
            document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
          }
        }
      }),
      {
        name: 'theme-store',
        onRehydrateStorage: () => (state) => {
          // Apply theme when store is rehydrated
          if (state && typeof window !== 'undefined') {
            document.documentElement.setAttribute(
              'data-theme',
              state.isDarkMode ? 'dark' : 'light'
            );
          }
        }
      }
    ),
    {
      name: 'theme-store'
    }
  )
);