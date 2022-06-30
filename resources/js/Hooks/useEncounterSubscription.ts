import { useEffect } from "react";
import { useQueryClient } from "react-query";

import { Encounter } from "@/types";
import { useEncounter } from "@/Hooks/useEncounter";

export const useEncounterSubscription = () => {
  const queryClient = useQueryClient();
  const { encounter } = useEncounter();

  useEffect(() => {
    if (window.Echo) {
      window.Echo.channel(encounter.slug).listen(
        "UpdateEncounter",
        (e: { encounter: Encounter }) => {
          queryClient.setQueryData(["encounter", encounter.id], e.encounter);
        }
      );

      window.Echo.connector.pusher.connection.bind("connecting", (payload: unknown) => {
        /**
         * All dependencies have been loaded and Channels is trying to connect.
         * The connection will also enter this state when it is trying to reconnect after a connection failure.
         */

        console.log("connecting...");
      });

      window.Echo.connector.pusher.connection.bind("connected", (payload: unknown) => {
        /**
         * The connection to Channels is open and authenticated with your app.
         */

        console.log("connected!", payload);
      });

      window.Echo.connector.pusher.connection.bind("unavailable", (payload: unknown) => {
        /**
         *  The connection is temporarily unavailable. In most cases this means that there is no internet connection.
         *  It could also mean that Channels is down, or some intermediary is blocking the connection. In this state,
         *  pusher-js will automatically retry the connection every 15 seconds.
         */

        console.log("unavailable", payload);
      });

      window.Echo.connector.pusher.connection.bind("failed", (payload: unknown) => {
        /**
         * Channels is not supported by the browser.
         * This implies that WebSockets are not natively available and an HTTP-based transport could not be found.
         */

        console.log("failed", payload);
      });

      window.Echo.connector.pusher.connection.bind(
        "disconnected",
        (payload: unknown) => {
          /**
           * The Channels connection was previously connected and has now intentionally been closed
           */

          console.log("disconnected", payload);
        }
      );

      window.Echo.connector.pusher.connection.bind("message", (payload: unknown) => {
        /**
         * Ping received from server
         */

        console.log("message", payload);
      });
    }
  }, [encounter.id, encounter.slug, queryClient]);
};
