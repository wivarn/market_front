import { createContext, useState } from "react";
import { getSession, signOut, useSession } from "next-auth/client";

import { ProfileApi } from "services/backendApi/profile";
import router from "next/router";
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
  const [session] = useSession();
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

  // Might not be the best place to put this. Maybe we should have this in the layout or _app
  // page instead. It has be somewhere global or at least anywhere that could have a session.
  useEffect(() => {
    if (session?.error) {
      signOut({ redirect: false, callbackUrl: "/" }).then(async () => {
        router.push("/");
      });
    }
  }, [session]);

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
