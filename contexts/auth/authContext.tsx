import React from "react";
import { CognitoUserExt } from "./types";
import useAuth from "./useAuth";

const AuthContext = React.createContext<{
  loading: boolean;
  user: CognitoUserExt | null;
}>({ loading: false, user: null });
export const useAuthContext = () => React.useContext(AuthContext);
export const AuthProvider: React.FC = ({ children }) => {
  const { user, loading } = useAuth();
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
