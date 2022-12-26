<template>
  <q-page class="flex flex-center">
    <div class="welcome">WITAJ</div>
    <div class="info">
      Dziękuję Ci za zainstalowanie mojej aplikacji, stwożyłem ją aby pomagać
      ludziom w osiaganiu ich celów związanych ze zdrowszym trybem życia, aby
      rozpocząć będę musiał się dowiedzieć kilku podstawowych rzeczy
    </div>

    <div class="fillup">
      <q-select
        square
        outlined
        label="Płeć biologiczna"
        class="q-pa-sm"
        :options="genders"
        option-label="name"
        option-value="id"
        v-model="genderSelect"
        emit-value
      />
      <q-input
        label="Wiek"
        class="q-pa-sm"
        v-model="age"
        square
        standout
        type="number"
      />
      <q-input
        label="Waga ciała"
        type="number"
        class="q-pa-sm"
        v-model="weight"
        square
        outlined
      />
      <q-input
        label="Wzrost"
        class="q-pa-sm"
        type="number"
        v-model="height"
        square
        outlined
      />
      <!-- <q-toggle
        v-model="meatselect"
        color="red"
        label="Jesz mięso?"
        left-label
      /> -->
      <q-select
        square
        outlined
        label="Cel!"
        class="q-pa-sm"
        :options="goals"
        option-value="id"
        option-label="name"
        v-model="targetSelect"
        emit-value
      />

      <q-btn
        color="secondary"
        @click="setVar(0, genderSelect, weight, height, age, targetSelect)"
        label="POLICZ!"
      />

      <div id="status" v-if="logg == true" class="result">
        <div>Twoje Wyniki</div>
        <div>Podstawowa przemiana materii</div>
        <b>{{ this.ppm }} kcal</b>
        <div>aby osiągnąć cel powinieneś przyswajać</div>
        <b>{{ this.calories }} kcal</b>
        <div class="row justify-between">
          <div>
            <q-banner>białko</q-banner>
            <b>{{ this.protein }} g</b>
          </div>
          <div>
            <q-banner>węglowodany</q-banner>
            <b>{{ this.carbs }} g</b>
          </div>

          <div>
            <q-banner>tłuszcze</q-banner>
            <b> {{ this.fat }} g</b>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import { useQuasar } from "quasar";
import { onBeforeUnmount } from "vue";

import { Notify } from "quasar";

export default defineComponent({
  setup() {
    const $q = useQuasar();
    let timer;

    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer);
        $q.loading.hide();
      }
    });

    const loading = ref([false, false, false, false, false, false]);

    const progress = ref(false);

    function setVar(number, gender, weight, height, age, target) {
      let ppm = 10 * weight + 6.25 * height - 5 * age + 5;

      if (gender !== 1) {
        ppm = ppm - 166;
      }
      if (ppm <= 0) {
        ppm = "błąd, prowadz prawidłowe wartości";
        localStorage.setItem("protein", 0);
        localStorage.setItem("fat", 0);
        localStorage.setItem("carbs", 0);
        localStorage.setItem("calories", 0);
      } else {
        if (target == 1) {
          localStorage.setItem("ppm", ppm);
          ppm = ppm + 100;
          let protein = (ppm * 0.23) / 4;

          let fat = (ppm * 0.2) / 9;
          let carb = (ppm * 0.57) / 4;

          protein = protein.toFixed(2);
          fat = fat.toFixed(2);
          carb = carb.toFixed(2);

          localStorage.setItem("protein", protein);
          localStorage.setItem("fat", fat);
          localStorage.setItem("carbs", carb);
          localStorage.setItem("calories", ppm);
          localStorage.setItem("water", ppm);
        } else if (target == 2) {
          localStorage.setItem("ppm", ppm);
          ppm = ppm + 500;
          let protein = (ppm * 0.2) / 4;
          let fat = (ppm * 0.3) / 9;
          let carb = (ppm * 0.5) / 4;

          protein = protein.toFixed(2);
          fat = fat.toFixed(2);
          carb = carb.toFixed(2);

          localStorage.setItem("protein", protein);
          localStorage.setItem("fat", fat);
          localStorage.setItem("carbs", carb);
          localStorage.setItem("calories", ppm);
          localStorage.setItem("water", ppm);
        } else if (target == 3) {
          localStorage.setItem("ppm", ppm);
          ppm = ppm + 250;
          let protein = (ppm * 0.2) / 4;
          let fat = (ppm * 0.3) / 9;
          let carb = (ppm * 0.5) / 4;

          protein = protein.toFixed(2);
          fat = fat.toFixed(2);
          carb = carb.toFixed(2);
          localStorage.setItem("protein", protein);
          localStorage.setItem("fat", fat);
          localStorage.setItem("carbs", carb);
          localStorage.setItem("calories", ppm);
          localStorage.setItem("water", ppm);
        }

        console.log(gender, weight, height, age, target);
      }
      $q.loading.show({
        message: "<b>To zajmie tylko chwilkę</b>",
        html: true,
      });

      // hiding in 3s
      timer = setTimeout(() => {
        $q.loading.hide();
        timer = void 0;
      }, 3000);

      // timer = setTimeout(() => {
      //   $q.notify({
      //     message: "Twoje Dane zostały wprowadzone do systemu",
      //     color: "lighblue",
      //   });
      // }, 4000);

      setTimeout(() => {
        document.location.reload();
      }, 3000);
    }

    return {
      loading,
      progress,
      setVar,
    };
  },
  methods: {},
  data: () => ({
    meatselect: false,
    age: null,
    weight: null,
    height: null,
    targetSelect: null,
    genderSelect: null,
    nameselect: null,
    logg: true,
    ppm: localStorage.getItem("ppm"),
    calories: localStorage.getItem("calories"),
    water: localStorage.getItem("water"),
    protein: localStorage.getItem("protein"),
    carbs: localStorage.getItem("carbs"),
    fat: localStorage.getItem("fat"),

    genders: [
      { name: "mężczyzna", id: 1 },
      { name: "kobieta", id: 2 },
    ],
    goals: [
      { id: 1, name: "schudnąć" },
      { id: 2, name: "przytyć" },
      { id: 3, name: "utrzymać masę ciała" },
    ],
  }),

  name: "IndexPage",
});
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
.info {
  position: absolute;
  top: 15vw;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 90vw; /* Need a specific value to work */

  font-family: "Candara";
  font-style: normal;
  font-weight: auto;
  font-size: auto;
  line-height: 15px;
  text-align: center;

  color: #000000;
}
.fillup {
  position: absolute;
  top: 40vw;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;

  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  /* identical to box height */
  text-align: center;

  color: #000000;
}

.result {
  border: solid 1px black;
  margin: 2%;
}

* {
  font-family: "Courier New", Courier, monospace;
}
</style>
