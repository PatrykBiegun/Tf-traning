<template>
  <q-page class="flex flex-center">
    <div class="title">WODA</div>
    <div class="info">
      Twoje dziennie zapotrzebowanie na wodę to<br />
      {{ this.waterAmount }} ml <br />
      <b> jedno kliknięcie to 200ml</b>
    </div>

    <q-circular-progress
      show-value
      class="text-light-blue q-ma-md"
      :value="water"
      size="80vw"
      color="light-blue"
      @click="slider()"
    />

    <!-- <div class="funfact">Woda jest mokra</div> -->
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { TypedChainedSet } from "webpack-chain";

export default defineComponent({
  name: "main_costs",

  data: () => ({
    waterAmount: localStorage.getItem("water"),

    water: parseFloat(localStorage.getItem("waterLeft")),
  }),

  methods: {
    slider() {
      let temp_water, temp_water2;
      temp_water = Math.round((100 * 200) / localStorage.getItem("water"));
      temp_water2 = localStorage.getItem("waterLeft");

      this.water = Math.round(parseFloat(temp_water2) + parseFloat(temp_water));
      localStorage.setItem("waterLeft", this.water);
    },

    reset() {
      localStorage.setItem("waterLeft", 0);
    },
  },
});
</script>

<style scoped>
/* #box {
  width: 200px;
  height: 400px;
  border: 10px solid #ccc;
  border-radius: 10px;
  line-height: 100px;
  text-align: center;
  color: #ddd;
  font-size: 25px;
  font-weight: 600;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
}
#box:after {
  content: "";
  position: absolute;
  width: 400px;
  height: 40%;
  background: #00acee;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 40%;
  animation: fill 8s ease-in-out infinite;
}

@keyframes fill {
  from {
    top: 250px;
    transform: translatex(-50%) rotate(odeg);
  }
  to {
    top: -10px;
    transform: translatex(-50%) rotate(36bdeg);
  }
} */

.funfact {
  /* Wodne Ciekawostki */

  position: absolute;
  width: 290px;
  height: 40px;

  bottom: 10vw;
  text-align: center;
  font-family: "Quicksand";
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 40px;
  /* identical to box height */

  color: #000000;
}

.info {
  /* Twoje dzienne zapotrzebowanie na dzisiaj to */

  position: absolute;
  width: 100vw;
  height: 40px;

  top: 12vw;
  text-align: center;
  font-family: "Candara";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height */

  color: #000000;
}

.water {
  position: absolute;
  width: 89px;
  height: 40px;

  top: 17vw;
  text-align: center;
  font-family: "Candara";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height */

  color: #000000;
}

.title {
  position: absolute;
  width: 89px;
  height: 40px;

  top: 2vw;

  font-family: "Candara";
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 40px;
  text-align: center;
  /* identical to box height */

  color: #000000;
}
</style>
