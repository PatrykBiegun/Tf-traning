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
        </q-list>

        <q-list style="text-align: left" class="q-gutter-md" separator>
          <q-item>Kanały na yt polecane przez nas </q-item>

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

    <q-footer class="q-mb-xl" v-if="shownotifications == 'true'">
      <q-toolbar class="bg-grey-3 justify-between">
        <q-icon name="mdi-bell" color="primary" size="xl" />

        <q-btn
          @click="enableNotifications"
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
    },

    enableNotifications() {
      if (this.pushNotificationsSupported) {
        Notification.requestPermission((result) => {
          console.log("result: ", result);
          this.neverShowNotificationsBanner();
          if (result == "granted") {
            // this.displayGrantedNotification()
            this.checkForExistingPushSubscription();
          }
        });
      }
    },
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    return {
      yourStats: ref(false),

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
    daysSpent: localStorage.getItem("daysSpent"),
    workoutsDone: localStorage.getItem("workoutsDone"),
    caloriesEaten: localStorage.getItem("caloriesEaten"),
    proteinsEaten: localStorage.getItem("proteinsEaten"),
    fatTotal: localStorage.getItem("fatTotal"),
    carbsEaten: localStorage.getItem("carbsEaten"),
    longestWaterStreak: localStorage.getItem("longestWaterStreak"),
    waterTotal: localStorage.getItem("waterTotal"),

    shownotifications: localStorage.getItem("showNotifications"),
    access: localStorage.getItem("access"),
  }),

  mounted() {
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
    const day = date.getMinutes();

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
