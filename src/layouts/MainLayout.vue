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
          <q-item
            >Poniżej kilka kanałów, które z pewnością pomogą ci osiągnąć cel
          </q-item>

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
          <q-item href="https://www.youtube.com/@MrAlphaFit">
            Alsquad <q-icon name="mdi-youtube" size="sm" color="red"
          /></q-item>
          <q-item href="https://www.youtube.com/@CzowiekuRUSZSIE">
            Człowieku, RUSZ SIĘ!
            <q-icon name="mdi-youtube" size="sm" color="red" />
          </q-item>
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
    shownotifications: localStorage.getItem("showNotifications"),
    access: localStorage.getItem("access"),
  }),

  mounted() {
    if (localStorage.getItem("showNotifications") == undefined) {
      localStorage.setItem("showNotifications", true);
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
