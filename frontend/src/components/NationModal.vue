<template>
  <div id="modal-container">
    <div id="modal" class="panel panel-default">
      <div>
        <span @click="close()" class="close"></span>
      </div>
      <div class="name-wrapper">
        <div class="flag-wrapper">
          <FlagDisplayer :nation="selectedNation" />
        </div>
        <span v-if="selectedNation.name.official != selectedNation.name.common">
          {{ selectedNation.name.official }}</span
        >
      </div>
      <hr />
      <div class="capital-wrapper">
        <span class="chapter">Capital:</span>
        <div v-for="capital in selectedNation.capital" :key="capital">
          <span>{{ capital}}</span>
        </div>
      </div>
      <hr />
      <div class="languages-wrapper">
        <span class="chapter">Languages:</span>
        <div class="language-group">
          <div v-for="language in selectedNation.languages" :key="language">
            <span>{{ language }}</span>
          </div>
        </div>
      </div>
      <hr />
      <div class="capital-wrapper">
        <span class="chapter">ISO code</span>
        <div v-for="capital in selectedNation.capital" :key="capital">
          <span>{{ selectedNation.cca3 }}</span>
        </div>
      </div>
      <hr />
      <div class="currencies-wrapper">
        <span class="chapter">Currencies:</span>
        <div class="currencies-group">
          <div v-for="currency in selectedNation.currencies" :key="currency">
            <span
              >{{ currency[Object.keys(currency)[0]] }}
              {{ currency[Object.keys(currency)[1]] }}</span
            >
          </div>
        </div>
      </div>
      <hr />
      <div class="population-wrapper">
        <span class="chapter">Population:</span>
        <span>{{ selectedNation.population.toLocaleString() }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { defineComponent, Prop, PropType } from "vue";
import { Nation } from "../Models/Nation";
import FlagDisplayer from "../components//FlagDisplayer.vue";

const NationModal = defineComponent({
  name: "NationModal" as string,

  components: { FlagDisplayer },

  props: {
    selectedNation: Object as PropType<Nation>,
  },

  emits: ["close"],

  methods: {
    close() {
      this.$emit("close");
    },
  },
});

export default NationModal;
</script>



<style scoped>
.label-input {
  justify-content: left;
}

.chapter {
  font-weight: bold;
}

.language-group {
  display: flex;
  flex-direction: column;
}

#modal-overlay #modal {
  width: 280px;
}

.flag-wrapper {
  display: flex;
  justify-content: space-around;
  padding-bottom: 5px;
}

.capital-wrapper,
.languages-wrapper,
.population-wrapper,
.currencies-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 0px 40px 10px 40px;
}

.capital-group,
.language-group,
.population-group,
.currencies-group {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.btn-warning {
  background-color: rgb(204, 138, 51) !important;
}

#modal {
  position: fixed;
  top: 35%;
  left: 50%;
  width: 400px;
  transform: translateY(-50%) translateX(-50%);
  background: #e9e5e5;
  box-shadow: #2a2a29 3px 3px 20px 7px;
}

.name-wrapper {
  display: flex;
  flex-direction: column;
  height: 140px;
}

.modal-container {
  display: flex;
  position: absolute;
  z-index: 5;
  pointer-events: none;
}

.close {
  position: absolute;
  right: 17px;
  top: 13px;
  width: 32px;
  height: 32px;
  opacity: 0.3;
  cursor: pointer;
}
.close:hover {
  opacity: 1;
}

.close:before,
.close:after {
  position: absolute;
  left: 15px;
  content: " ";
  height: 33px;
  width: 2px;
  background-color: #333;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}
</style>