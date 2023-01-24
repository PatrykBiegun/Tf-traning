<template>
  <q-layout view="hhh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <!-- <q-btn dense flat round  @click="toggleLeftDrawer" /> -->

        <q-toolbar-title>
          <q-avatar> <q-img src="../statics/icon3.png" /></q-avatar>

          TF-traning
        </q-toolbar-title>

        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="toggleLeftDrawer"
          size="xl"
        />
      </q-toolbar>

      <!-- <q-tabs align="left">
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs> -->
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <div class="row" id="menu">
        <q-list style="font-size: large; width: 100%" class="desktop-only">
          <q-item clickable v-ripple to="/">Dane</q-item>
          <q-item
            :disable="access != 'true'"
            clickable
            v-ripple
            to="/traning"
            class="row"
            >Trening</q-item
          >
          <q-item
            :disable="access != 'true'"
            clickable
            v-ripple
            to="/diet"
            class="row"
            >Dieta</q-item
          >
          <q-item
            :disable="access != 'true'"
            clickable
            v-ripple
            to="/water"
            class="row"
            >Woda</q-item
          >
        </q-list>

        <q-list style="text-align: left" class="q-gutter-md" separator>
          <q-item>Kanały na YouTube polecane przez nas </q-item>

          <q-item href="https://www.youtube.com/user/monikakolakowska">
            Monika Kołakowska
            <q-icon name="mdi-youtube" size="sm" color="red" />
          </q-item>
          <q-item href="https://www.youtube.com/@trenujzkura4082">
            KURA workout <q-icon name="mdi-youtube" size="sm" color="red" />
          </q-item>
          <q-item href="https://www.youtube.com/@TreningFitnessbyPaula">
            Trening Fitness <q-icon name="mdi-youtube" size="sm" color="red" />
          </q-item>
          <!-- <q-item>Twoje kanały na yt </q-item> -->
          <q-btn
            class="q-mt-xl q-ml-xl"
            style="width: 80%"
            size="md"
            color="primary"
            @click="showYourStats()"
            >zobacz swoje wyniki</q-btn
          >

          <q-btn
            class="q-ml-xl"
            style="width: 80%"
            size="md"
            color="primary"
            @click="resetTotalStats()"
            >zresetuj wyniki</q-btn
          >

          <q-btn
            v-if="showNotificationButton == 'true'"
            class="q-ml-xl"
            style="width: 80%"
            size="md"
            color="primary"
            @click="enableNotifications()"
            >Włącz powiadomienia</q-btn
          >

          <q-btn
            class="q-ml-xl"
            style="width: 80%"
            size="md"
            color="primary"
            @click="dietReminder()"
            >powiadomka</q-btn
          >
          <q-btn
            class="q-ml-xl"
            style="width: 80%"
            size="md"
            color="primary"
            @click="waterReminder()"
            >powiadomka1</q-btn
          >
          <q-btn
            class="q-ml-xl"
            style="width: 80%"
            size="md"
            color="primary"
            @click="workoutReminder()"
            >powiadomka2</q-btn
          >
        </q-list>
      </div>
    </q-drawer>

    <!-- <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
    </q-drawer> -->
    <!-- <body>
      <button @click="pushNot()">chuj</button>
    </body> -->

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer
      class="q-mb-xl"
      v-if="
        shownotifications == 'true' &&
        serviceWorkerSupported &&
        pushNotificationsSupported
      "
    >
      <q-toolbar class="bg-grey-3 justify-between">
        <q-icon name="mdi-bell" color="primary" size="xl" />

        <q-btn
          @click="enableNotifications()"
          label="Tak"
          color="primary"
          dense
          flat
          size="md"
        />
        <q-btn
          @click="shownotifications = false"
          label="Potem"
          color="primary"
          class="q-px-sm"
          dense
          flat
          size="md"
        />
        <q-btn
          @click="neverShowNotificationsBanner()"
          label="Nigdy"
          color="primary"
          class="q-px-sm"
          dense
          flat
          size="md"
        />
      </q-toolbar>
    </q-footer>
    <q-footer class="q-mb-xl" v-if="showInstalation == 'true'">
      <q-toolbar class="justify-between">
        <q-item>Czy chcesz zainstalować TF-traning?</q-item>

        <q-btn
          @click="InstallApp()"
          label="Tak"
          color="white"
          dense
          flat
          size="md"
        />
        <q-btn
          @click="showInstalation = false"
          label="Potem"
          color="white"
          class="q-px-sm"
          dense
          flat
          size="md"
        />
        <q-btn
          @click="neverShowInstalation()"
          label="Nigdy"
          color="white"
          class="q-px-sm"
          dense
          flat
          size="md"
        />
      </q-toolbar>
    </q-footer>

    <q-footer bordered class="bg-amber-10 text-white mobile-only fixed-bottom">
      <q-toolbar>
        <q-toolbar-title>
          <div class="col-12 row" id="menu">
            <q-item clickable v-ripple to="/" class="col-3 flex-center"
              >Dane</q-item
            >

            <q-item
              :disable="access != 'true'"
              clickable
              v-ripple
              to="/traning"
              class="col-3 flex-center"
              >Trening</q-item
            >
            <q-item
              :disable="access != 'true'"
              clickable
              v-ripple
              to="/diet"
              class="col-3 flex-center"
              >Dieta</q-item
            >

            <q-item
              :disable="access != 'true'"
              clickable
              v-ripple
              to="/water"
              class="col-3 flex-center"
              >Woda</q-item
            >
          </div>
        </q-toolbar-title>
        <!-- <q-tabs
          v-model="tab"
          no-caps
          outside-arrows
          mobile-arrows
          class="bg-orange text-white shadow-2"
        >
          <div class="row" id="menu">
            <q-item clickable v-ripple to="/" class="flex-center">Dane</q-item>
            <q-item clickable v-ripple to="/traning" class="flex-center"
              >Trening</q-item
            >
            <q-item clickable v-ripple to="/diet" class="flex-center"
              >Dieta</q-item
            >

            <q-item clickable v-ripple to="/water" class="flex-center"
              >Woda</q-item
            >
          </div>
        </q-tabs> -->
      </q-toolbar>
    </q-footer>
  </q-layout>

  <q-dialog v-model="yourStats">
    <q-card class="q-pa-md" style="width: 1800px; text-align: center">
      <div v-if="this.daysSpent > 0">
        Dziękuję, używasz mojej aplikacji już {{ daysSpent }} dni
      </div>
      <div v-if="this.daysSpent == 0">
        Już od jutra będą się tutaj pojawiać twoje wyniki!
      </div>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Treningi</q-item-label>
          <q-item-label caption
            >Spędziłeś na treningu:
            {{ parseFloat(workoutsDone / 60).toFixed(2) }}
            minuty</q-item-label
          >
          <q-item-label caption
            >Średnio na trening dziennie przeznaczasz:
            <div v-if="this.daysSpent > 0 && workoutsDone > 0">
              {{ parseFloat(workoutsDone / 60 / daysSpent).toFixed(2) }}
              minut
            </div></q-item-label
          >
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Dieta</q-item-label>
          <q-item-label caption
            >Średnia ilość kalorii na dzień
            <div v-if="this.daysSpent > 0 && caloriesEaten > 0">
              {{ parseFloat(caloriesEaten / daysSpent).toFixed(2) }}
            </div>
          </q-item-label>
          <q-item-label caption>
            Średnia ilość białka na dzień:
            <div v-if="this.daysSpent > 0 && proteinsEaten > 0">
              {{ parseFloat(proteinsEaten / daysSpent).toFixed(2) }}
            </div>
          </q-item-label>
          <q-item-label caption>
            Średnia ilość węglowodanów na dzień:
            <div v-if="this.daysSpent > 0 && carbsEaten > 0">
              {{ parseFloat(carbsEaten / daysSpent).toFixed(2) }}
            </div></q-item-label
          >
          <q-item-label caption>
            Średnia ilość tłuszczy na dzień:
            <div v-if="this.daysSpent > 0 && fatTotal > 0">
              {{ parseFloat(fatTotal / daysSpent).toFixed(2) }}
            </div></q-item-label
          >
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Woda</q-item-label>
          <!-- <q-item-label caption
            >Średnia ilość wody na dzień {{ waterTotal }}</q-item-label
          > -->
          <q-item-label
            >Twoja najdłuższa nieprzerwana seria codziennego picia wody
            {{ longestWaterStreak }}</q-item-label
          >
        </q-item-section>
      </q-item>
    </q-card>
  </q-dialog>
</template>

<script>
import { openDB } from "idb";
import { ref } from "vue";
import { date } from "vue";
import { useQuasar } from "quasar";
import { onBeforeUnmount } from "vue";
let deferredPrompt;

export default {
  computed: {
    serviceWorkerSupported() {
      if ("serviceWorker" in navigator) return true;
      return false;
    },
    pushNotificationsSupported() {
      if ("PushManager" in window) return true;
      return false;
    },
  },
  methods: {
    neverShowInstalation() {
      this.showInstalation = "false";
      localStorage.setItem("showInstalation", "false");
    },

    InstallApp() {
      // Hide the app provided install promotion
      this.showInstalation = "false";
      localStorage.setItem("showInstalation", "false");

      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
          this.showInstalation = "false";
          localStorage.setItem("showInstalation", "false");
        } else {
          console.log("User dismissed the install prompt");
        }
      });

      deferredPrompt = null;

      deferredPrompt = null;
    },

    resetTotalStats() {
      this.$q
        .dialog({
          title: "Potwierdź",
          message:
            "Czy chcesz usunąć wszystkie statystyki dotyczące treningu i diety oraz dni?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          localStorage.setItem("proteinsEaten", 0);
          localStorage.setItem("fatTotal", 0);
          localStorage.setItem("carbsEaten", 0);
          localStorage.setItem("caloriesEaten", 0);
          localStorage.setItem("workoutsDone", 0);
          localStorage.setItem("daysSpent", 0);
          setTimeout(() => {
            document.location.reload();
          }, 1000);
        });
    },

    showYourStats() {
      this.yourStats = true;
    },

    neverShowNotificationsBanner() {
      this.shownotifications = "false";
      localStorage.setItem("showNotifications", "false");

      if (localStorage.getItem("showNotificationButton") == "mode1")
        localStorage.setItem("showNotificationButton", "true");
    },

    enableNotifications() {
      if (localStorage.getItem("showNotificationButton") == "true") {
        console.log("dupa");
        localStorage.setItem("showNotificationButton", "false");
      }

      if (this.pushNotificationsSupported) {
        Notification.requestPermission((result) => {
          console.log("result: ", result);
          this.neverShowNotificationsBanner();

          if (result == "granted") {
            this.displayGrantedNotification();
            // this.checkForExistingPushSubscription();
            console.log("powiadomienia działają!");
          } else {
            localStorage.setItem("showNotificationButton", "true");
          }
        });
      }
    },

    checkForExistingPushSubscription() {
      if (this.serviceWorkerSupported && this.pushNotificationsSupported) {
        let reg;
        navigator.serviceWorker.ready
          .then((swreg) => {
            reg = swreg;
            return swreg.pushManager.getSubscription();
          })
          .then((sub) => {
            if (!sub) {
              this.createPushSubscription(reg);
            }
          });
      }
    },

    createPushSubscription(reg) {
      let vapidPublicKey =
        "BEuaVH7wuQRpj1XrYb3yKRZekc50NzFBKeR1wfDT7F1dqNlk20upwRnMhUHSdXUfZf9X_MKROlBFDpdc3H7Znlo";
      let vapidPublicKeyConverted = this.urlBase64ToUint8Array(vapidPublicKey);
      reg.pushManager
        .subscribe({
          applicationServerKey: vapidPublicKeyConverted,
          userVisibleOnly: true,
        })
        .then((newSub) => {
          console.log("newSub ", newSub);
          let newSubData = newSub.toJSON();
          console.log("newSubData ", newSubData);
        });
      // .then((response) => {
      //   this.displayGrantedNotification();
      // })
      // .catch((err) => {
      //   console.log("err: ", err);
      // });
    },

    urlBase64ToUint8Array(base64String) {
      const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    },

    waterReminder() {
      navigator.serviceWorker.ready.then((swreg) => {
        swreg.showNotification("Hejka, pamiętaj o piciu wody!", {
          body: "Przejdź do aplikacji aby uzupełnić ile dziś juz wypiłeś!",
          icon: "icons/icon-128x128.png",
          image: "icons/water.jpg",

          dir: "ltr",
          lang: "en-US",
          vibrate: [100, 50, 200],
          tag: "confirm-notification",
          renotify: true,
          actions: [
            {
              action: "water",
              title: "Przejdź to strony",
            },
            // {
            //   action: "closeNotification",
            //   title: "Usuń powiadomienie",
            // },
          ],
        });
      });

      document.location.reload();
    },

    workoutReminder() {
      navigator.serviceWorker.ready.then((swreg) => {
        swreg.showNotification("Ruch to zdrowie, może mały trening?", {
          body: "Przejdź do aplikacji i ćwicz z naszym licznikiem!",
          icon: "icons/icon-128x128.png",
          image: "icons/workout.jpg",

          dir: "ltr",
          lang: "en-US",
          vibrate: [100, 50, 200],
          tag: "confirm-notification",
          renotify: true,
          actions: [
            {
              action: "workout",
              title: "Przejdź to strony",
            },
            // {
            //   action: "closeNotification",
            //   title: "Usuń powiadomienie",
            // },
          ],
        });
      });

      document.location.reload();
    },

    dietReminder() {
      navigator.serviceWorker.ready.then((swreg) => {
        swreg.showNotification("Hej! Mam nadzieję że miałeś pyszny dzień", {
          body: "Pamiętaj żeby uzupełnić co dzisiaj jadłeś w aplikacji!",
          icon: "icons/icon-128x128.png",
          image: "icons/diet.jpg",
          dir: "ltr",
          lang: "en-US",
          vibrate: [100, 50, 200],
          tag: "confirm-notification",
          renotify: true,
          actions: [
            {
              action: "diet",
              title: "Przejdź to strony",
            },
            // {
            //   action: "closeNotification",
            //   title: "Usuń powiadomienie",
            // },
          ],
        });
      });

      document.location.reload();
    },

    displayGrantedNotification() {
      if (this.serviceWorkerSupported && this.pushNotificationsSupported) {
        navigator.serviceWorker.ready.then((swreg) => {
          swreg.showNotification("Zasubkskrybowałeś powiadomienia!", {
            body: "Pamiętaj, że apklikacja musi działać w tle abyś je otrzymywał!",
            icon: "icons/icon-128x128.png",
            dir: "ltr",
            lang: "en-US",
            vibrate: [100, 50, 200],
            tag: "confirm-notification",
            renotify: true,
            actions: [
              {
                action: "closeNotification ",
                title: "Usuń powiadomienie",
              },
            ],
          });
        });
      }

      document.location.reload();
    },
  },

  setup() {
    let timer;
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    return {
      yourStats: ref(false),
      timer,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },

  data: () => ({
    notificationNumber: localStorage.getItem("notificationNumber"),
    daysSpent: localStorage.getItem("daysSpent"),
    workoutsDone: localStorage.getItem("workoutsDone"),
    caloriesEaten: localStorage.getItem("caloriesEaten"),
    proteinsEaten: localStorage.getItem("proteinsEaten"),
    fatTotal: localStorage.getItem("fatTotal"),
    carbsEaten: localStorage.getItem("carbsEaten"),
    longestWaterStreak: localStorage.getItem("longestWaterStreak"),
    waterTotal: localStorage.getItem("waterTotal"),
    water: parseFloat(localStorage.getItem("waterLeft")),

    showNotificationButton: localStorage.getItem("showNotificationButton"),
    shownotifications: localStorage.getItem("showNotifications"),
    showInstalation: localStorage.getItem("showInstalation"),
    access: localStorage.getItem("access"),
  }),

  mounted() {
    this.$q.notify({
      message: "Witaj ponownie!",

      color: "primary",
    });
    // let NotiTimer;

    setInterval(() => {
      if (this.water <= 100) {
        console.log(this.water);
        this.waterReminder();
      } else if (this.notificationNumber == "0") {
        localStorage.setItem("notificationNumber", "1");
        this.dietReminder();
      } else if (this.notificationNumber == "1") {
        localStorage.setItem("notificationNumber", "0");
        this.workoutReminder();
      } else {
        this.dietReminder();
      }
    }, 60000 * 5);

    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA

      // Optionally, send analytics event that PWA install promo was shown.
      console.log("beforeinstallprompt event was fired.");
    });

    if (localStorage.getItem("notificationNumber") == undefined) {
      localStorage.setItem("notificationNumber", "0");
    }

    if (localStorage.getItem("showNotificationButton") == undefined) {
      localStorage.setItem("showNotificationButton", "mode1");
    }

    if (localStorage.getItem("daysSpent") == undefined) {
      localStorage.setItem("daysSpent", 0);
    }
    if (localStorage.getItem("workoutsDone") == undefined) {
      localStorage.setItem("workoutsDone", 0);
    }
    if (localStorage.getItem("caloriesEaten") == undefined) {
      localStorage.setItem("caloriesEaten", 0);
    }
    if (localStorage.getItem("proteinsEaten") == undefined) {
      localStorage.setItem("proteinsEaten", 0);
    }
    if (localStorage.getItem("fatTotal") == undefined) {
      localStorage.setItem("fatTotal", 0);
    }
    if (localStorage.getItem("carbsEaten") == undefined) {
      localStorage.setItem("carbsEaten", 0);
    }

    if (localStorage.getItem("dataExpand") == undefined) {
      localStorage.setItem("dataExpand", false);
    }
    if (localStorage.getItem("macroExpand") == undefined) {
      localStorage.setItem("macroExpand", true);
    }
    if (localStorage.getItem("waterStreak") == undefined) {
      localStorage.setItem("waterStreak", 0);
    }

    if (localStorage.getItem("showNotifications") == undefined) {
      localStorage.setItem("showNotifications", true);
    }
    if (localStorage.getItem("showInstalation") == undefined) {
      localStorage.setItem("showInstalation", true);
    }

    if (localStorage.getItem("longestWaterStreak") == undefined) {
      localStorage.setItem("longestWaterStreak", 0);
    }

    if (localStorage.getItem("waterTotal") == undefined) {
      localStorage.setItem("waterTotal", 0);
    }

    const $q = useQuasar();
    let timer;

    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer);
        $q.loading.hide();
      }
    });
    const date = new Date();
    const day = date.getDate();

    if (localStorage.getItem("today") == undefined) {
      localStorage.setItem("today", day);
    }

    if (parseFloat(localStorage.getItem("today")) != day) {
      $q.loading.show({
        message: "<b>Nowy dzień, nowe możliwości!</b>",
        html: true,
      });

      timer = setTimeout(() => {
        $q.loading.hide();
        timer = void 0;
      }, 3000);

      if (localStorage.getItem("waterLeft") >= 100) {
        let temp_waterStreak = localStorage.getItem("waterStreak");
        temp_waterStreak = parseFloat(temp_waterStreak) + 1;
        localStorage.setItem("waterStreak", temp_waterStreak);
      } else localStorage.setItem("waterStreak", 0);

      if (
        localStorage.getItem("longestWaterStreak") <=
        localStorage.getItem("waterStreak")
      )
        localStorage.setItem(
          "longestWaterStreak",
          localStorage.getItem("waterStreak")
        );

      if (
        localStorage.getItem("caloriesLeft") != 0 ||
        localStorage.getItem("proteinLeft") != 0 ||
        localStorage.getItem("carbsEaten") != 0 ||
        localStorage.getItem("fatTotal") != 0
      ) {
        localStorage.setItem(
          "caloriesEaten",
          parseFloat(localStorage.getItem("caloriesEaten")) +
            parseFloat(localStorage.getItem("caloriesLeft"))
        );
        localStorage.setItem(
          "proteinsEaten",
          parseFloat(localStorage.getItem("proteinsEaten")) +
            parseFloat(localStorage.getItem("proteinLeft"))
        );
        localStorage.setItem(
          "carbsEaten",
          parseFloat(localStorage.getItem("carbsLeft")) +
            parseFloat(localStorage.getItem("carbsEaten"))
        );
        localStorage.setItem(
          "fatTotal",
          parseFloat(localStorage.getItem("fatLeft")) +
            parseFloat(localStorage.getItem("fatTotal"))
        );

        localStorage.setItem(
          "waterTotal",
          parseFloat(localStorage.getItem("waterLeft")) +
            parseFloat(localStorage.getItem("waterTotal"))
        );

        localStorage.setItem(
          "daysSpent",
          parseFloat(localStorage.getItem("daysSpent")) + 1
        );
      }

      localStorage.setItem("today", day);
      localStorage.setItem("waterLeft", 0);
      localStorage.setItem("carbsLeft", 0);
      localStorage.setItem("fatLeft", 0);
      localStorage.setItem("caloriesLeft", 0);
      localStorage.setItem("proteinLeft", 0);
      localStorage.setItem("proteinBar", 0);
      localStorage.setItem("fatBar", 0);
      localStorage.setItem("caloriesBar", 0);
      localStorage.setItem("carbsBar", 0);
      localStorage.setItem("dailyfood", "Twoje dzisiejsze produkty!");

      setTimeout(() => {
        document.location.reload();
      }, 3000);
    }
  },
};
</script>

<style scoped>
#menu {
  text-align: center;
}

button {
  padding: 0.5rem 1.5rem;
  font-size: 3rem;
  border-radius: 5px;
}

* {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
