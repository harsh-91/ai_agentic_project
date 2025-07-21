import React, { createContext, useContext } from "react";

// Constant dummy user always present
const UserContext = createContext({
  user: { id: "anon", username: "Anonymous" },
  setUser: () => {},
});

export function UserProvider({ children }) {
  // Always logged in as 'Anonymous'
  return (
    <UserContext.Provider value={{ user: { id: "anon", username: "Anonymous" }, setUser: () => {} }}>
      {children}
    </UserContext.Provider>
  );
}
export function useUser() {
  return useContext(UserContext);
}
