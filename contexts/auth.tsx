import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import api from "../services/api";

interface authContextType {
  isAuthenticated: boolean;
  user: object | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  // logout: () => void;
  loading: boolean;
}

const authContextDefaultValues: authContextType = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  login: async () => {},
  // logout: () => {},
  loading: false,
};

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function loadUserFromCookies() {
  //     const token = Cookies.get("token");
  //     if (token) {
  //       console.log("Got a token in the cookies, let's see if it is valid");
  //       api.defaults.headers.Authorization = `Bearer ${token}`;
  //       const { data: user } = await api.get("users/me");
  //       if (user) setUser(user);
  //     }
  //     setLoading(false);
  //   }
  //   loadUserFromCookies();
  // }, []);

  const login = async (email: string, password: string) => {
    await api
      .post("auth/login", {
        login: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
    // if (token) {
    //   console.log("Got token");
    //   Cookies.set("token", token, { expires: 60 });
    //   api.defaults.headers.Authorization = `Bearer ${token.token}`;
    //   const { data: user } = await api.get("users/me");
    //   setUser(user);
    //   console.log("Got user", user);
    // }
  };

  // const logout = (email, password) => {
  //   Cookies.remove("token");
  //   setUser(null);
  //   delete api.defaults.headers.Authorization;
  //   window.location.pathname = "/login";
  // };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!accessToken,
        user,
        accessToken,
        login,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
