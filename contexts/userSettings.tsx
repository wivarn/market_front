import { createContext, useState } from "react";
import { signOut, useSession } from "next-auth/react";

import { IListingTemplate } from "types/listings";
import { IOfferDetailed } from "types/offer";
import { OfferApi } from "services/backendApi/offer";
import { ProfileApi } from "services/backendApi/profile";
import router from "next/router";
import { useEffect } from "react";
import { useInterval } from "ultils/hooks";

interface IUserSettingsContext {
  userSettings: IUserSettings;
  updateUserSettings: (accessToken?: string) => void;
  updateOffers: (accessToken?: string) => void;
  assignUserSettings: (newUserSettings: Partial<IUserSettings>) => void;
  resetUserSettings: () => void;
}

interface IUserSettings {
  currency: "CAD" | "USD";
  country: "CAN" | "USA" | "";
  address_set: boolean;
  stripe_linked: boolean;
  listing_template: IListingTemplate;
  has_cart: boolean;
  cart_items: { listing_id: string }[];
  offers: { purchase_offers: IOfferDetailed[]; sale_offers: IOfferDetailed[] };
  has_pending_shipment: boolean;
  selling_enabled: boolean;
  previous_path: string;
  default_settings?: boolean;
}

const defaultSettings: IUserSettings = {
  currency: "USD",
  country: "",
  address_set: false,
  stripe_linked: false,
  has_cart: false,
  cart_items: [],
  offers: { purchase_offers: [], sale_offers: [] },
  has_pending_shipment: false,
  selling_enabled: false,
  listing_template: { accept_offers: false },
  previous_path: "/",
  default_settings: true,
};

export const UserSettingsContext = createContext<IUserSettingsContext>({
  userSettings: defaultSettings,
  updateUserSettings: () => {
    // empty
  },
  updateOffers: () => {
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

  const updateOffers = (accessToken?: string) => {
    if (!accessToken) {
      resetUserSettings();
    } else {
      OfferApi(accessToken)
        .index()
        .then((offersResponse) => {
          setUserSettings({
            ...userSettings,
            default_settings: false,
            offers: offersResponse.data,
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

  useInterval(() => {
    if (session === undefined) return;
    updateUserSettings(session?.accessToken);
  }, 15 * 60 * 1000);

  // Might not be the best place to put this. It has be somewhere global or at least anywhere that could have a session.
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
    updateOffers: updateOffers,
    assignUserSettings: assignUserSettings,
    resetUserSettings: resetUserSettings,
  };

  return (
    <UserSettingsContext.Provider value={contextProps}>
      {children}
    </UserSettingsContext.Provider>
  );
};
