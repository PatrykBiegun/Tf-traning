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

  if (action == "hello") {
    console.log("Hello button was clicked");
  } else if (action == "goodbye") {
    console.log("Goodbye button was clicked");
  } else {
    event.waitUntil(
      clients.matchAll().then((clis) => {
        let clientUsingApp = clis.find((cli) => {
          return cli.visibilityState === "visible";
        });
        if (clientUsingApp) {
          clientUsingApp.navigate(notification.data.openUrl);
          clientUsingApp.focus();
        } else {
          clients.openWindow(notification.data.openUrl);
        }
      })
    );
  }
  notification.close();
});

self.addEventListener("notificationclose", (event) => {
  console.log("Notification was closed", event);
});
