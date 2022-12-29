<template>
  <q-page class="flex flex-center">
    <div class="q-pa-sm q-mt-xl fullscreen" style="max-height: 40vw">
      <q-banner class="foodBaner"
        >Kalorie <br />
        {{ this.caloriesLeft }} / {{ this.calories }}</q-banner
      >
      <q-linear-progress
        :value="this.caloriesBar"
        class="q-mt-md"
        color="green"
      />
      <q-banner class="foodBaner"
        >Białko <br />
        {{ this.proteinLeft }} / {{ this.protein }}</q-banner
      >
      <q-linear-progress :value="this.proteinBar" class="q-mt-md" />
      <q-banner class="foodBaner"
        >Węgle <br />
        {{ this.carbsLeft }} / {{ this.carbs }}</q-banner
      >
      <q-linear-progress
        :value="this.carbBar"
        color="warning"
        class="q-mt-sm"
      />
      <q-banner class="foodBaner"
        >Tłuszcze
        <br />
        {{ this.fatLeft }} / {{ this.fat }}
      </q-banner>
      <q-linear-progress
        :value="this.fatBar"
        color="secondary"
        class="q-mt-sm"
      />
      <div style="text-align: center">
        <q-btn
          class="q-mt-sm q-mb-md fixed-center"
          label="Dodaj nowy produkt"
          style="width: 300px"
          @click="openFoodArray()"
        ></q-btn>
        <q-btn
          class="q-mt-xl q-mb-md fixed-center"
          label="Zobacz dzisiejsze produkty"
          style="width: 300px"
          @click="openTodayFoodArray()"
        ></q-btn>
      </div>
    </div>

    <div
      class="fixed-bottom q-mb-xl"
      style="
        max-height: 30vw;
        text-align: center;
        margin-bottom: 200px;
        wdith: 100%;
      "
    >
      <q-banner> <b>każda pozycja oznacza 100g produktu</b></q-banner>
      <q-virtual-scroll
        class=""
        style="text-align: center; max-height: 250px"
        :items="temp_food"
        separator
        v-slot="{ item, index }"
      >
        <q-item :key="index" dense>
          <q-item-section>
            <q-item-label q-pa-xl>
              <b>{{ item.id }}</b> <br />białko: {{ item.bialko }} węgle:
              {{ item.wegle }} tłuszcze:{{ item.tluszcze }}</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-virtual-scroll>
    </div>
  </q-page>

  <q-dialog v-model="todaysFoodArray">
    <q-card class="q-pa-md" style="width: 1800px">
      <div v-for="food in TodaysFood" :key="food.id" type="table">
        <div class="col-md-2 col-xs-12">
          <div class="col-12 row flex mobile-only">
            <div class="col-10">> {{ food }}</div>
          </div>
          <div class="col-md-3 col-xs-12 desktop-only q-mt-sm">>{{ food }}</div>
        </div>
      </div>
      <q-btn flat label="Cofnij" v-close-popup />
    </q-card>
  </q-dialog>

  <q-dialog v-model="addYourFood">
    <q-card class="q-pa-md" style="width: 1800px">
      <div style="width: 80vw; text-align: center">
        <q-input label="Nazwa" v-model="Addname"></q-input>
        <q-input label="Kalorie" type="number" v-model="Addcalories"> </q-input>
        <q-input label="Białko" type="number" v-model="Addprotein"></q-input>
        <q-input label="Węgle" type="number" v-model="Addcarbs"></q-input>
        <q-input label="Tłuszcze" type="number" v-model="Addfat"></q-input>
      </div>
      <div class="mobilebuttons">
        <q-btn flat label="Cofnij" v-close-popup />
        <q-btn
          flat
          @click="
            openAmountArray(Addname, Addprotein, Addcarbs, Addfat, Addcalories)
          "
          label="Dodaj"
          v-close-popup
        />
      </div>
    </q-card>
  </q-dialog>

  <q-dialog v-model="foodarray">
    <q-card class="q-pa-md" style="width: 1800px">
      <div class="col">
        <q-card-actions class="text-black">
          <div class="col-xs-12 col-md-12">
            <q-tooltip> Wpisz produkt </q-tooltip>
            <q-input
              v-model="desc_filter"
              class="q-mt-xs q-ma-xs"
              label="Filtruj po nazwie produktu"
              outlined
            />
            <q-select
              class="q-mt-xs q-ma-xs"
              filled
              label="Wyszukiwanie po kategoriach"
              v-model="type_filter"
              :options="types"
              option-value="kategoria"
              option-label="name"
              emit-value
            />
          </div>
          <div class="q-pa-md col-xs-12 col-md-12">
            <q-list class="rounded-borders" style="text-align: center">
              <q-btn @click="this.addYourFood = true"
                >Dodaj swój własny produkt </q-btn
              ><br />
              <b>każda pozycja oznacza 100g produktu</b>
              <b>
                <div class="row desktop-only">
                  <div class="col-md-3 col-xs-12">Nazwa</div>
                  <div class="col-md-2 col-xs-12">Białko</div>
                  <div class="col-md-3 col-xs-12">Tłuszcze</div>
                  <div class="col-md-2 col-xs-12">Węgle</div>
                </div>
              </b>

              <div v-for="food in name_filter()" :key="food.id" type="table">
                <q-card square horizontal class="q-pa-sm q-pt-md q-mt-sm">
                  <div class="row">
                    <div class="col-md-3 col-xs-12">
                      <div
                        class="column col-12 row flex mobile-only items-center text-bold"
                      >
                        <div class="col-3">
                          <span> </span>
                        </div>
                        <div class="col-9">{{ food.id }}</div>
                      </div>
                      <div class="col-md-3 col-xs-12 desktop-only q-mt-sm">
                        {{ food.id }}
                      </div>
                    </div>

                    <div class="col-md-2 col-xs-12">
                      <div class="col-12 row flex mobile-only">
                        <div class="col-10">Białko: {{ food.bialko }}</div>
                      </div>
                      <div class="col-md-3 col-xs-12 desktop-only q-mt-sm">
                        {{ food.bialko }}
                      </div>
                    </div>

                    <div class="col-md-2 col-xs-12">
                      <div class="col-12 row flex wrap mobile-only">
                        <div class="col-8">Tłuszcze: {{ food.tluszcze }}</div>
                      </div>
                      <div class="col-md-3 col-xs-12 desktop-only q-mt-sm">
                        {{ food.tluszcze }}
                      </div>
                    </div>

                    <div class="col-md-3 col-xs-12 items-start">
                      <div
                        class="col-12 row flex wrap mobile-only justify-start"
                      >
                        <div class="col">Węglowodany: {{ food.wegle }}</div>
                      </div>
                      <div class="col-md-3 col-xs-12 desktop-only q-mt-sm">
                        {{ food.wegle }}
                      </div>
                    </div>
                    <div :class="mobileButtons">
                      <q-btn
                        dense
                        class="q-pa-xs q-mr-sm"
                        color="primary"
                        size="md"
                        icon="add"
                        @click="
                          openAmountArray(
                            food.id,
                            food.bialko,
                            food.tluszcze,
                            food.wegle,
                            food.kalorie
                          )
                        "
                      />
                    </div>
                  </div>
                </q-card>
              </div>
            </q-list>
          </div>

          <q-btn flat label="Cofnij" v-close-popup />
        </q-card-actions>
      </div>
    </q-card>
  </q-dialog>

  <q-dialog v-model="amountArray" persistent
    ><q-card class="q-pa-md" style="width: 1800px">
      <div style="text-align: center">
        <div>
          Ile chcesz dodać produktu {{ this.temp_name }}? <br />
          <b>Każda pozycja oznacza 100g produktu</b>
        </div>
        <div class="foodBaner">
          <q-btn
            dense
            class="q-pa-xs q-mr-sm"
            color="primary"
            size="md"
            icon="add"
            @click="increaseAmount()"
          />
          {{ this.amount }}
          <q-btn
            dense
            class="q-pa-xs q-mr-sm"
            color="primary"
            size="md"
            icon="remove"
            @click="decreaseAmount()"
          />
        </div>
      </div>
      <div class="foodBaner">
        <q-btn flat label="Cofnij" v-close-popup />
        <q-btn flat label="Zatwierdź" @click="addfoodToTable()" v-close-popup />
      </div> </q-card
  ></q-dialog>
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
import { defineComponent } from "vue";
import { ref, computed } from "vue";

export default defineComponent({
  name: "IndexPage",

  data: () => ({
    TodaysFood: [],
    showTodayFood: localStorage.getItem("dailyfood"),

    types: [
      { name: "Wszystkie", kategoria: "" },
      { name: "Mięso", kategoria: "mieso" },
      { name: "Warzywa", kategoria: "warzywa" },
      { name: "Owoce", kategoria: "owoce" },
      { name: "Napoje", kategoria: "napoje" },
      { name: "Fast-food", kategoria: "Fastfood" },
    ],
    calories: localStorage.getItem("calories"),
    caloriesLeft: localStorage.getItem("caloriesLeft"),
    proteinLeft: localStorage.getItem("proteinLeft"),
    protein: localStorage.getItem("protein"),
    carbs: localStorage.getItem("carbs"),
    carbsLeft: localStorage.getItem("carbsLeft"),
    fat: localStorage.getItem("fat"),
    fatLeft: localStorage.getItem("fatLeft"),

    Addcalories: 0,
    Addcarbs: 0,
    Addfat: 0,
    Addprotein: 0,
    Addname: "",

    caloriesBar: localStorage.getItem("caloriesBar"),
    proteinBar: localStorage.getItem("proteinBar"),
    carbBar: localStorage.getItem("carbsBar"),
    fatBar: localStorage.getItem("fatBar"),

    type_filter: 0,
    food: [],
    temp_food: [],

    foodSelect: null,
    amount: 1,
    desc_filter: "",
    temp_name: "",
    temp_protein: localStorage.getItem("proteinBar"),
    temp_carbs: localStorage.getItem("carbsBar"),
    temp_fat: localStorage.getItem("fatBar"),
    temp_calories: localStorage.getItem("caloriesBar"),
  }),

  methods: {
    openTodayFoodArray() {
      let foodArray = localStorage.getItem("dailyfood");
      foodArray = foodArray.split(",");
      this.TodaysFood = foodArray;
      this.todaysFoodArray = true;
    },

    addfoodToTable() {
      for (let i = 1; i <= this.amount; i++) {
        this.temp_food.push({
          id: this.temp_name,
          kalorie: this.temp_calories,
          bialko: this.temp_protein,
          tluszcze: this.temp_fat,
          wegle: this.temp_carbs,
        });

        this.caloriesLeft =
          parseFloat(this.temp_calories) + parseFloat(this.caloriesLeft);
        this.proteinLeft =
          parseFloat(this.temp_protein) + parseFloat(this.proteinLeft);
        this.carbsLeft =
          parseFloat(this.temp_carbs) + parseFloat(this.carbsLeft);
        this.fatLeft = parseFloat(this.temp_fat) + parseFloat(this.fatLeft);
      }

      console.log(localStorage.getItem("dailyfood"));
      this.caloriesBar =
        Math.round((100 * this.caloriesLeft) / this.calories) + "%";
      this.proteinBar =
        Math.round((100 * this.proteinLeft) / this.protein) + "%";
      this.fatBar = Math.round((100 * this.fatLeft) / this.fat) + "%";
      this.carbBar = Math.round((100 * this.carbsLeft) / this.carbs) + "%";

      let set = localStorage.getItem("dailyfood");

      set = set.concat(",", this.temp_name);

      localStorage.setItem("dailyfood", set);

      localStorage.setItem("farBar", this.fatBar),
        localStorage.setItem("proteinBar", this.proteinBar),
        localStorage.setItem("carbsBar", this.carbBar),
        localStorage.setItem("caloriesBar", this.caloriesBar),
        localStorage.setItem("fatBar", this.fatBar),
        localStorage.setItem("caloriesLeft", this.caloriesLeft),
        localStorage.setItem("proteinLeft", this.proteinLeft);
      localStorage.setItem("carbsLeft", this.carbsLeft),
        localStorage.setItem("fatLeft", this.fatLeft),
        (this.amount = 1);
    },

    increaseAmount() {
      this.amount = this.amount + 1;
    },
    decreaseAmount() {
      if (this.amount > 0) {
        this.amount = this.amount - 1;
      }
    },
    name_filter() {
      return this.food.filter(
        (item) =>
          item.id.toLowerCase().includes(this.desc_filter.toLowerCase()) &&
          this.type_filter_Function(item.kategoria)
      );
    },
    type_filter_Function(type) {
      let flag = true;

      if (this.type_filter == 0) return flag;
      else if (type == this.type_filter) return flag;
    },

    openFoodArray() {
      this.foodarray = true;
    },
    openAmountArray(nazwa, protein, fat, carbs, calories) {
      this.temp_name = nazwa;
      this.temp_calories = calories;
      this.temp_carbs = carbs;
      this.temp_fat = fat;
      this.temp_protein = protein;
      // console.log(
      //   this.temp_name,
      //   this.temp_calories,
      //   this.temp_carbs,
      //   this.temp_fat,
      //   this.temp_protein
      // );

      this.temp_calories;
      this.amountArray = true;
    },

    load_food() {
      const colRef = collection(db, "food");
      getDocs(colRef).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.food.push({ id: doc.id, ...doc.data() });
        });
      });
      console.log(this.food);
    },

    addnewFood(bialko) {
      alert("dupa");
      // this.bialko = this.bialko + bialko * this.amount;
    },
  },

  setup() {
    const progress1 = ref(0.9);
    const progress2 = ref(0.9);

    return {
      foodarray: ref(false),
      todaysFoodArray: ref(false),
      amountArray: ref(false),
      addYourFood: ref(false),

      progress1,
      progressLabel1: computed(() => (progress1.value * 100).toFixed(2) + "%"),

      progress2,
      progressLabel2: computed(() => (progress2.value * 100).toFixed(2) + "%"),
    };
  },

  mounted() {
    this.load_food();
    this.name_filter();

    if (this.$q.platform.is.mobile) {
      this.mobileButtons = "full-width row justify-between";
    } else {
      this.mobileButtons = "";
    }
  },
});
</script>

<style scoped>
.foodBaner {
  /* background-color: aquamarine; */
  text-align: center;
}
/* .temp_foodShow {
  margin-top: 50vw;
  width: 80vw;
  text-align: center;
} */
</style>
