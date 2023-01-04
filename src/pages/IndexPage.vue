<template>
  <q-page class="flex flex-center" style="text-align: center">
    <div style="width: 50vw" class="desktop-only">
      WITAJ <br />

      Aby rozpocząć będę musiał się dowiedzieć kilku podstawowych rzeczy

      <q-select
        square
        outlined
        label="Płeć"
        class="q-pa-sm"
        :options="genders"
        option-label="name"
        option-value="name"
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
      <q-select
        square
        outlined
        label="Cel!"
        class="q-pa-sm"
        :options="goals"
        option-value="name"
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
        <div>
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
          <div>
            <q-banner>woda</q-banner>
            <b> {{ this.water }} ml</b>
          </div>
        </div>
      </div>
    </div>

    <div class="mobile-only">
      WITAJ <br />

      Aby rozpocząć będę musiał się dowiedzieć kilku podstawowych rzeczy

      <q-select
        square
        outlined
        label="Płeć"
        class="q-pa-sm"
        :options="genders"
        option-label="name"
        option-value="name"
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
      <q-select
        square
        outlined
        label="Cel!"
        class="q-pa-sm"
        :options="goals"
        option-value="name"
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
        <div>
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
          <div>
            <q-banner>woda</q-banner>
            <b> {{ this.water }} ml</b>
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
      if (
        gender != null &&
        weight >= 20 &&
        weight <= 610 &&
        height >= 80 &&
        height <= 280 &&
        age >= 8 &&
        age <= 130 &&
        target != null
      ) {
        let ppm = 10 * weight + 6.25 * height - 5 * age + 5;

        if (gender == "kobieta") {
          ppm = ppm - 166;
        }
        if (ppm <= 0) {
          ppm = "błąd, prowadz prawidłowe wartości";
          localStorage.setItem("protein", 0);
          localStorage.setItem("fat", 0);
          localStorage.setItem("carbs", 0);
          localStorage.setItem("calories", 0);
        } else {
          if (target == "schudnąć") {
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
          } else if (target == "przytyć") {
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
          } else if (target == "utrzymać masę ciała") {
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
          localStorage.setItem("access", "true");

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

        setTimeout(() => {
          document.location.reload();
        }, 3000);
      } else {
        $q.loading.show({
          message: "<b>To zajmie tylko chwilkę</b>",
          html: true,
        });

        timer = setTimeout(() => {
          $q.loading.hide();
          timer = void 0;
        }, 2000);

        timer = setTimeout(() => {
          $q.notify({
            message: "Musisz poprawnie uzupełnić wszystkie dane!",
            color: "error",
          });
        }, 3000);
      }
    }

    return {
      loading,
      progress,
      setVar,
    };
  },

  mounted() {
    if (this.$q.platform.is.mobile) {
      this.desktopIndex = "";
    } else {
      this.desktopIndex = "width:50vw;";
    }
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
.result {
  border: solid 1px black;
  margin: 2%;
}
</style>
