import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const ACCOUNT_KEY = "landlord_desk_account";
const SESSION_KEY = "landlord_desk_session";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedSession =
        localStorage.getItem(SESSION_KEY);

      if (!savedSession) {
        return null;
      }

      return JSON.parse(savedSession);
    } catch {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
  });

  const signup = (accountData) => {
    const existingAccount =
      localStorage.getItem(ACCOUNT_KEY);

    if (existingAccount) {
      const account = JSON.parse(existingAccount);

      if (
        account.email.toLowerCase() ===
        accountData.email.trim().toLowerCase()
      ) {
        return {
          success: false,
          message:
            "An account with this email already exists.",
        };
      }

      if (
        account.mobile ===
        accountData.mobile.trim()
      ) {
        return {
          success: false,
          message:
            "An account with this mobile number already exists.",
        };
      }
    }

    const account = {
      name: accountData.name.trim(),
      email: accountData.email.trim().toLowerCase(),
      mobile: accountData.mobile.trim(),
      password: accountData.password,
    };

    localStorage.setItem(
      ACCOUNT_KEY,
      JSON.stringify(account)
    );

    return {
      success: true,
      message: "Account created successfully.",
    };
  };

  const login = (loginValue, password) => {
    const savedAccount =
      localStorage.getItem(ACCOUNT_KEY);

    if (!savedAccount) {
      return {
        success: false,
        message:
          "No account found. Please create an account first.",
      };
    }

    const account = JSON.parse(savedAccount);

    const value = loginValue.trim();

    const emailMatches =
      account.email.toLowerCase() ===
      value.toLowerCase();

    const mobileMatches =
      account.mobile === value;

    const passwordMatches =
      account.password === password;

    if (
      (!emailMatches && !mobileMatches) ||
      !passwordMatches
    ) {
      return {
        success: false,
        message: "Invalid email/mobile or password.",
      };
    }

    const sessionUser = {
      name: account.name,
      email: account.email,
      mobile: account.mobile,
    };

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(sessionUser)
    );

    setUser(sessionUser);

    return {
      success: true,
      message: "Login successful.",
    };
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
