<template>
  <q-layout view="hhh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <!-- <q-btn dense flat round  @click="toggleLeftDrawer" /> -->

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>

        <!-- <q-btn dense flat round icon="menu" @click="toggleRightDrawer" /> -->
      </q-toolbar>

      <!-- <q-tabs align="left">
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs> -->
    </q-header>
    <!--
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>

    </q-drawer> -->
    <!--
    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>

    </q-drawer> -->
    <!-- <body>
      <button @click="pushNot()">chuj</button>
    </body> -->

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div class="col-12 row" id="menu">
            <q-item clickable v-ripple to="/" class="col-4 flex-center"
              >Dane</q-item
            >
            <q-item
              :disable="access != 'true'"
              clickable
              v-ripple
              to="/traning"
              class="col-4 flex-center"
              >Trening</q-item
            >
            <q-item
              :disable="access != 'true'"
              clickable
              v-ripple
              to="/diet"
              class="col-4 flex-center"
              >Dieta</q-item
            >
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-footer bordered class="bg-grey-8 text-white mobile-only fixed-bottom">
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
import { ref } from "vue";
import { date } from "vue";
import { useQuasar } from "quasar";
import { onBeforeUnmount } from "vue";

export default {
  // methods: {
  // pushNot() {
  //   let button = document.querySelector("button");
  //   button.addEventListener("click", () => {
  //     Notification.requestPermission().then((perm) => {
  //       if (perm === "granted") {
  //         const notification = new Notification("Example notification", {
  //           body: "mess",
  //         });
  //         notification.addEventListener("error", (e) => {
  //           alert("error");
  //         });
  //       }
  //     });
  //   });
  //   let notification;
  //   let interval;
  //   document.addEventListener("visibilitychange", () => {
  //     if (document.visibilityState === "hidden") {
  //       const leaveDate = new Date();
  //       interval = setInterval(() => {
  //         body: {
  //           Math.round((new Date() - leaveDate) / 1000);
  //         }
  //         seconds;
  //         tag: " nie wiem ";
  //       });
  //     } else {
  //       clearInterval(interval);
  //       notification.close();
  //     }
  //   });
  // },
  // },

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
    access: localStorage.getItem("access"),
  }),

  // mounted() {
  //   const $q = useQuasar();
  //   let timer;

  //   onBeforeUnmount(() => {
  //     if (timer !== void 0) {
  //       clearTimeout(timer);
  //       $q.loading.hide();
  //     }
  //   });
  //   const date = new Date();
  //   const day = date.getMinutes();

  //   if (parseFloat(localStorage.getItem("today")) != day) {
  //     $q.loading.show({
  //       message: "<b>Nowy dzień, nowe możliwości!</b>",
  //       html: true,
  //     });

  //     timer = setTimeout(() => {
  //       $q.loading.hide();
  //       timer = void 0;
  //     }, 3000);
  //     localStorage.setItem("today", day);
  //     localStorage.setItem("waterLeft", 0);
  //     setTimeout(() => {
  //       document.location.reload();
  //     }, 3000);
  //   }
  // },
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
</style>
