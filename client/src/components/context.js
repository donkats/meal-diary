import { useContext, createContext } from "react";

export const AppContext = createContext({});

export function useAppContext() {
  return useContext(AppContext);
}

// This really simple bit of code is creating and exporting two things:

// Using the createContext API to create a new context for our app.
// Using the useContext React Hook to access the context.