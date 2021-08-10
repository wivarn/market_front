import { createContext, useState } from "react";
import { signOut, useSession } from "next-auth/client";

import { IListingTemplate } from "types/listings";
import { ProfileApi } from "services/backendApi/profile";
import router from "next/router";
import { useEffect } from "react";

interface IUserSettingsContext {
  userSettings: IUserSettings;
  updateUserSettings: (accessToken?: string) => void;
  resetUserSettings: () => void;
}

interface IUserSettings {
  currency: "CAD" | "USD";
  country: "CAN" | "USA";
  address_set: boolean;
  stripe_linked: boolean;
  listing_template: IListingTemplate;
  default_settings?: true;
}

const defaultSettings: IUserSettings = {
  currency: "USD",
  country: "USA",
  address_set: false,
  stripe_linked: false,
  listing_template: {},
  default_settings: true,
};

export const UserSettingsContext = createContext<IUserSettingsContext>({
  userSettings: defaultSettings,
  updateUserSettings: () => {
    // empty
  },
  resetUserSettings: () => {
    // empty
  },
});

export const UserSettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [session] = useSession();
  const [userSettings, setUserSettings] = useState<IUserSettings>(
    defaultSettings
  );

  const updateUserSettings = (accessToken?: string) => {
    if (!accessToken) {
      resetUserSettings();
    } else {
      ProfileApi(accessToken)
        .settings()
        .then((profileResponse) => {
          setUserSettings(profileResponse.data);
        });
    }
  };

  const resetUserSettings = () => {
    setUserSettings(defaultSettings);
  };

  useEffect(() => {
    if (session === undefined) return;
    updateUserSettings(session?.accessToken);
  }, [session]);

  // Might not be the best place to put this. Maybe we should have this in the layout or _app
  // page instead. It has be somewhere global or at least anywhere that could have a session.
  useEffect(() => {
    if (session?.error) {
      signOut({ redirect: false, callbackUrl: "/" }).then(async () => {
        router.push("/");
        resetUserSettings();
      });
    }
  }, [session]);

  const contextProps: IUserSettingsContext = {
    userSettings: userSettings,
    updateUserSettings: updateUserSettings,
    resetUserSettings: resetUserSettings,
  };

  return (
    <UserSettingsContext.Provider value={contextProps}>
      {children}
    </UserSettingsContext.Provider>
  );
};
