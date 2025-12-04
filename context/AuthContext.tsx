"use client";

import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import {
  User,
  RegisterData,
  login as apiLogin,
  register as apiRegister,
  getProfile,
  refreshToken as apiRefreshToken,
} from "@/lib/api";
import {
  setAuthToken,
  clearAuthData,
  getAuthToken,
  setRefreshToken as setRefreshTokenUtil,
  getRefreshToken,
} from "@/lib/auth-utils";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  refreshUserProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  refreshUserProfile: async () => {},
});

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load user on mount if token exists
  useEffect(() => {
    const initAuth = async () => {
      const token = getAuthToken();
      if (token) {
        try {
          const userProfile = await getProfile();
          setUser(userProfile);
        } catch (error) {
          console.error("Failed to load user profile:", error);
          clearAuthData();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      console.log("🟢 AuthContext: Starting login for", email);

      // Call login API
      console.log("🟢 AuthContext: Calling API login...");
      const authData = await apiLogin({ email, password });
      console.log("🟢 AuthContext: API login response received", authData);

      // Store tokens (backend returns 'accessToken')
      setAuthToken(authData.accessToken);
      if (authData.refreshToken) {
        setRefreshTokenUtil(authData.refreshToken);
      }

      // Fetch user profile
      console.log("🟢 AuthContext: Fetching user profile...");
      const userProfile = await getProfile();
      console.log("🟢 AuthContext: User profile received", userProfile);
      setUser(userProfile);

      console.log("✅ AuthContext: Login successful");
      return true;
    } catch (error) {
      console.error("❌ AuthContext: Login error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData: RegisterData): Promise<boolean> => {
    try {
      setLoading(true);

      // Register user
      await apiRegister(userData);

      // Automatically log in after registration
      const loginSuccess = await login(userData.email, userData.password);
      return loginSuccess;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    setUser(null);
    clearAuthData();
    router.push("/");
  }, [router]);

  const refreshUserProfile = async () => {
    try {
      const userProfile = await getProfile();
      setUser(userProfile);
    } catch (error) {
      console.error("Failed to refresh user profile:", error);
    }
  };

  // Token refresh logic
  useEffect(() => {
    const refreshInterval = setInterval(async () => {
      const token = getAuthToken();
      const refresh = getRefreshToken();

      if (token && refresh) {
        try {
          const newTokens = await apiRefreshToken(refresh);
          setAuthToken(newTokens.accessToken); // Use accessToken instead of token
          if (newTokens.refreshToken) {
            setRefreshTokenUtil(newTokens.refreshToken);
          }
        } catch (error) {
          console.error("Token refresh failed:", error);
          // If refresh fails, log out the user
          logout();
        }
      }
    }, 15 * 60 * 1000); // Refresh every 15 minutes

    return () => clearInterval(refreshInterval);
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, refreshUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
