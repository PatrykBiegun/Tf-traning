<template>
  <q-page class="flex flex-center">
    <div v-for="food in food" :key="food.id">
      <div class="col-12 row border-radius: 10px 10px 0px 0px">
        <div class="col-3">{{ food.bialko }}</div>
        <div class="col-3">{{ food.tluszcze }}</div>
        <div class="col-3">{{ food.wegle }}</div>
        <div class="col">{{ food.kalorie }}</div>
      </div>
      <q-btn @click="addnewFood(food.bialko)">dodaj</q-btn>
    </div>

    <div class="q-pa-md">
      <q-banner>Białko</q-banner>
      <q-linear-progress :value="this.bialko" class="q-mt-md" />
      <q-banner>Węgle</q-banner>
      <q-linear-progress :value="progress1" color="warning" class="q-mt-sm" />
      <q-banner>Tłuszcze</q-banner>
      <q-linear-progress :value="progress1" color="secondary" class="q-mt-sm" />
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
import { defineComponent } from "vue";
import { ref, computed } from "vue";

export default defineComponent({
  name: "IndexPage",

  data: () => ({
    bialko: 0,
    food: [],
    temp_food: [""],
    foodSelect: null,
    many: 1,
  }),

  methods: {
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
      this.bialko = this.bialko + bialko * this.many;
    },
  },

  setup() {
    const progress1 = ref(0.9);
    const progress2 = ref(0.9);

    return {
      progress1,
      progressLabel1: computed(() => (progress1.value * 100).toFixed(2) + "%"),

      progress2,
      progressLabel2: computed(() => (progress2.value * 100).toFixed(2) + "%"),
    };
  },

  mounted() {
    this.load_food();
  },
});
</script>

<style scoped></style>
