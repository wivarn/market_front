import { createContext, useState } from "react";

import { ProfileApi } from "services/backendApi/profile";
import { getSession } from "next-auth/client";
import { useEffect } from "react";

export const UserSettingsContext = createContext({
  userSettings: {},
  updateUserSettings: () => {
    // empty
  },
});

export const UserSettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [userSettings, setUserSettings] = useState({});

  const updateUserSettings = () => {
    getSession().then((session) => {
      session &&
        ProfileApi(session?.accessToken)
          .settings()
          .then((profileResponse) => {
            setUserSettings(profileResponse.data);
          });
    });
  };

  useEffect(() => {
    updateUserSettings();
  }, []);

  const contextProps = {
    userSettings: userSettings,
    updateUserSettings: updateUserSettings,
  };

  return (
    <UserSettingsContext.Provider value={contextProps}>
      {children}
    </UserSettingsContext.Provider>
  );
};
