import { createContext, useState } from "react";
import { signOut, useSession } from "next-auth/client";

import { IListingTemplate } from "types/listings";
import { ProfileApi } from "services/backendApi/profile";
import router from "next/router";
import { useEffect } from "react";

interface IUserSettingsContext {
  userSettings: IUserSettings;
  updateUserSettings: (accessToken?: string) => void;
  assignUserSettings: (newUserSettings: Partial<IUserSettings>) => void;
  resetUserSettings: () => void;
}

interface IUserSettings {
  currency: "CAD" | "USD";
  country: "CAN" | "USA";
  address_set: boolean;
  stripe_linked: boolean;
  listing_template: IListingTemplate;
  has_cart: boolean;
  has_pending_shipment: boolean;
  previous_path: string;
  default_settings?: boolean;
}

const defaultSettings: IUserSettings = {
  currency: "USD",
  country: "USA",
  address_set: false,
  stripe_linked: false,
  has_cart: false,
  has_pending_shipment: false,
  listing_template: {},
  previous_path: "/",
  default_settings: true,
};

export const UserSettingsContext = createContext<IUserSettingsContext>({
  userSettings: defaultSettings,
  updateUserSettings: () => {
    // empty
  },
  assignUserSettings: () => {
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
          setUserSettings({
            ...userSettings,
            default_settings: false,
            ...profileResponse.data,
          });
        });
    }
  };

  const assignUserSettings = (newUserSettings: Partial<IUserSettings>) => {
    setUserSettings({
      ...userSettings,
      default_settings: false,
      ...newUserSettings,
    });
  };

  const resetUserSettings = () => {
    setUserSettings(defaultSettings);
  };

  useEffect(() => {
    if (session === undefined || !userSettings.default_settings) return;
    updateUserSettings(session?.accessToken);
  }, [session]);

  useEffect(() => {
    function handleRouteChange() {
      assignUserSettings({ ...userSettings, previous_path: router.asPath });
    }
    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [userSettings]);

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
    assignUserSettings: assignUserSettings,
    resetUserSettings: resetUserSettings,
  };

  return (
    <UserSettingsContext.Provider value={contextProps}>
      {children}
    </UserSettingsContext.Provider>
  );
};
