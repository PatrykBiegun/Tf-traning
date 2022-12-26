<template>
  <q-page class="flex flex-center">
    <div class="welcome">Trening</div>
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

    <div v-for="workout in temp_workouts" :key="workout.id">
      <div class="col-12 row border-radius: 10px 10px 0px 0px">
        <div class="col-3">{{ workout.cw1 }}</div>
        <div class="col-3">{{ workout.cw2 }}</div>
        <div class="col-3">{{ workout.cw3 }}</div>
        <div class="col">{{ workout.cw4 }}</div>
      </div>
    </div>
  </q-page>
</template>

<script>
import db from "src/boot/firebase";
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
    };
  },

  methods: {
    smieci() {
      this.workouts.push();
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
      this.workouts.forEach((element) => {
        if (element.id == workoutSelect) {
          this.temp_workouts.push(element);
        }
      });
      console.log(this.temp_workouts);
    },
  },

  data: () => ({
    workouts: [],
    temp_workouts: [],
    workoutSelect: null,
  }),

  mounted() {
    this.load_workouts();
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
</style>
