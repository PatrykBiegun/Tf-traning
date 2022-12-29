<template>
  <q-page class="flex flex-center">
    <div class="fixed-top q-mt-xl" :style="wokroutSelectDekstop">
      <q-select
        use-chips
        class="q-mt-xs q-ma-xs"
        filled
        label="Wybierz Partię mięśni którą chcesz poćwiczyć"
        v-model="workoutSelect"
        :options="workouts"
        option-value="id"
        option-label="id"
        emit-value
        @update:model-value="setWorkout(workoutSelect)"
      />

      <q-virtual-scroll
        class=""
        style="text-align: center; max-height: 150px"
        :items="temp_workouts"
        separator
        v-slot="{ item, index }"
      >
        <q-item :key="index" dense>
          <q-item-section>
            <q-item-label q-pa-xl>
              <b> Ćwieczenie: </b> {{ item.cw1 }} <br /><br />
              <b> Ćwieczenie: </b>{{ item.cw2 }} <br /><br />
              <b> Ćwieczenie: </b>{{ item.cw3 }}<br /><br />
              <b> Ćwieczenie: </b>{{ item.cw4 }} <br /><br /><b> Ćwieczenie: </b
              >{{ item.cw5 }} <br /><br /><b> Ćwieczenie: </b>{{ item.cw6
              }}<br /><br />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-virtual-scroll>
    </div>
    <div class="fixed-bottom" style="text-align: center; margin-bottom: 10vw">
      <div class="q-mb-xl" :style="wokroutSelectDekstop">
        <q-input
          square
          outlined
          label="Długość przerw (sekundy)"
          type="number"
          class="col-3 q-pa-sm"
          v-model="breakTime"
        />
        <q-input
          square
          outlined
          type="number"
          label="Długość ćwiczeń (sekundy)"
          class="col-3 q-pa-sm"
          v-model="workoutTime"
        />
        <q-input
          square
          outlined
          label="Ilość serii "
          type="number"
          class="col-3 q-pa-sm"
          v-model="amountSelect"
        />
        <div class="q-mt-xl">
          <q-btn
            color="green"
            :disable="this.disable"
            @click="startTrening(breakTime, workoutTime, amountSelect)"
            >Start</q-btn
          >
          &NonBreakingSpace;
          <q-btn color="red" @click="resettraning()">Reset</q-btn>
        </div>
      </div>
      <q-circular-progress
        show-value
        class="stoper"
        :value="stoperTime"
        :size="desktopProgress"
        :color="this.colors"
      >
        <q-avatar :size="desktopProgress"> {{ this.timerProgress }} </q-avatar>
      </q-circular-progress>
    </div>
  </q-page>
</template>

<script>
import db from "src/boot/firebase";
import { useQuasar } from "quasar";
import { onBeforeUnmount } from "vue";
import {
  snapshot,
  collection,
  getDocs,
  where,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import { ref } from "vue";

export default {
  name: "TrainingPage",

  setup() {
    let $q = useQuasar();
    let timer;

    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer);
        $q.loading.hide();
      }
    });

    function resettraning() {
      $q.loading.show({
        message: "<b>Reset</b>",
        html: true,
      });

      timer = setTimeout(() => {
        $q.loading.hide();
        timer = void 0;
      }, 1000);

      setTimeout(() => {
        document.location.reload();
      }, 1000);
    }

    const loading = ref([false, false, false, false, false, false]);

    const progress = ref(false);

    function simulateProgress(number) {
      // we set loading state
      loading.value[number] = true;

      // simulate a delay
      setTimeout(() => {
        // we're done, we reset loading state
        loading.value[number] = false;
      }, 3000);
    }

    return {
      loading,
      progress,
      simulateProgress,
      resettraning,
    };
  },

  methods: {
    startTrening(breakLength, workoutLength, amount) {
      breakLength = Math.round(breakLength);
      workoutLength = Math.round(workoutLength);

      this.stoperTime = 0;
      this.timerProgress = 0;
      this.disable = true;
      let minutes = (1 * 100) / workoutLength;
      let breakminutes = (1 * 100) / breakLength;
      let phase = 0;
      // minutes = Math.round(minutes);
      var timer;

      timer = setInterval(() => {
        if (amount != 0) {
          if (phase == 0) {
            this.colors = "red";
            this.stoperTime = parseFloat(this.stoperTime) + parseFloat(minutes);

            if (this.timerProgress != workoutLength) {
              this.timerProgress++;
            } else {
              phase = 1;
              this.timerProgress = parseFloat(breakLength) + 1;
            }
          } else if (phase == 1) {
            this.colors = "green";
            this.stoperTime =
              parseFloat(this.stoperTime) - parseFloat(breakminutes);
            if (this.stoperTime <= 0) {
              this.stoperTime = 0;
              phase = 0;
              amount--;
            }
            if (this.timerProgress != 0) this.timerProgress--;
          }
        } else {
          this.disable = false;
          this.timerProgress = "💪";
          clearInterval(timer);
        }
      }, 1000);
    },

    load_workouts() {
      const colRef = collection(db, "workouts");
      getDocs(colRef).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.workouts.push({ id: doc.id, ...doc.data() });
        });
      });
      console.log(this.workouts);
    },

    setWorkout(workoutSelect) {
      this.temp_workouts = [];

      this.workouts.forEach((element) => {
        if (element.id == workoutSelect) {
          this.temp_workouts.push(element);
        }
      });
      console.log(this.temp_workouts);
    },
  },

  data: () => ({
    disable: false,
    colors: "red",
    breakTime: 15,
    workoutTime: 45,
    amountSelect: 1,
    timerProgress: 0,
    stoperTime: 0,
    workouts: [],
    temp_workouts: [],
    workoutSelect: 0,
  }),

  mounted() {
    this.load_workouts();

    if (this.$q.platform.is.mobile) {
      this.desktopProgress = "70vw";
    } else {
      this.desktopProgress = "10vw";
    }
    if (this.$q.platform.is.mobile) {
      this.wokroutSelectDekstop = "";
    } else {
      this.wokroutSelectDekstop = "margin-left: 20vw; width: 60vw";
    }
  },
};
</script>
<style scoped>
.welcome {
  position: absolute;

  top: 3vw;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 100px; /* Need a specific value to work */

  font-family: "Candara";
  font-style: normal;
  font-weight: 400;
  font-size: 32px;

  /* identical to box height */

  color: #000000;
}

.q-input {
  height: 50px;

  text-align: center;
  align-content: center;
}
</style>
