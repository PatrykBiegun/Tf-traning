<template>
  <q-page class="flex flex-center" style="text-align: center">
    <q-banner>
      WODA <br />Twoje dziennie zapotrzebowanie na wodę to<br />
      {{ this.waterAmount }} ml <br />
      <b> jedno kliknięcie to 200ml</b>
    </q-banner>

    <q-circular-progress
      show-value
      class="text-amber-4 q-ma-md"
      :value="water"
      size="80vw"
      color="blue"
      @click="slider()"
    />

    <q-banner size="xl"
      >Tyle dni z rzędu dałeś radę! <br />
      <b style="font-size: 20px">{{ waterStreak }}</b>
    </q-banner>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "main_costs",

  data: () => ({
    waterAmount: localStorage.getItem("water"),
    waterStreak: localStorage.getItem("waterStreak"),
    water: parseFloat(localStorage.getItem("waterLeft")),
  }),

  methods: {
    slider() {
      let temp_water, temp_water2;
      temp_water = Math.round((100 * 200) / localStorage.getItem("water"));
      temp_water2 = localStorage.getItem("waterLeft");

      this.water = Math.round(parseFloat(temp_water2) + parseFloat(temp_water));

      localStorage.setItem("waterLeft", this.water);

      timer = setTimeout(() => {
        $q.notify({
          message: "Dobra robota, na dziś wystarczy! Wróć jutro",
          color: "error",
        });
      }, 2000);
    },

    reset() {
      localStorage.setItem("waterLeft", 0);
    },
  },
});
</script>

<style scoped></style>
