/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.config.js > pwa > workboxPluginMode is set to "InjectManifest"
 */

import { precacheAndRoute } from "workbox-precaching";

// Use with precache injection
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("notificationclick", (event) => {
  let notification = event.notification;
  let action = event.action;

  if (action == "water") {
    event.waitUntil(
      clients.matchAll().then((clis) => {
        let clientUsingApp = clis.find((cli) => {
          return cli.visibilityState === "visible";
        });
        if (clientUsingApp) {
          clientUsingApp.navigate("/#/water");
          clientUsingApp.focus();
        } else {
          clients.openWindow("/#/water");
        }
      })
    );
  } else if (action == "diet") {
    event.waitUntil(
      clients.matchAll().then((clis) => {
        let clientUsingApp = clis.find((cli) => {
          return cli.visibilityState === "visible";
        });
        if (clientUsingApp) {
          clientUsingApp.navigate("/#/diet");
          clientUsingApp.focus();
        } else {
          clients.openWindow("/#/diet");
        }
      })
    );
  } else if (action == "workout") {
    event.waitUntil(
      clients.matchAll().then((clis) => {
        let clientUsingApp = clis.find((cli) => {
          return cli.visibilityState === "visible";
        });
        if (clientUsingApp) {
          clientUsingApp.navigate("/#/traning");
          clientUsingApp.focus();
        } else {
          clients.openWindow("/#/traning");
        }
      })
    );
  } else if (action == "closeNotification") {
    notification.close();
  } else {
    event.waitUntil(
      clients.matchAll().then((clis) => {
        let clientUsingApp = clis.find((cli) => {
          return cli.visibilityState === "visible";
        });
        if (clientUsingApp) {
          clientUsingApp.navigate(/#/);
          clientUsingApp.focus();
        } else {
          clients.openWindow(/#/);
        }
      })
    );
  }

  notification.close();
});

self.addEventListener("notificationclose", (event) => {
  console.log("Notification was closed", event);
});
