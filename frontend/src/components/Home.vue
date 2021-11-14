<template>
  <div class="main-wrapper">
    <div v-if="loadModal" class="modal-wrapper">
      <NationModal :selectedNation="selectedNation" @close="closeModal" />
    </div>
    <div class="input-wrapper">
      <div class="form-wrapper">
        <input
          class="search-input"
          type="text"
          placeholder="Filter. . ."
          v-model="searchword"
          @input="(event) => this.filterCountries(event)"
        />
      </div>
      <button
        @click="udpateFilters"
        v-if="addMostPopuloseFilter"
        class="button-active"
      >
        Most populous 
      </button>
      <button @click="udpateFilters" v-else class="button-not-active">
        Most populous 
      </button>
    </div>
    <div v-if="!loading">
      <div class="flag-container">
        <div class="zoom" v-for="nation in nationsInUse" :key="nation">
          <FlagDisplayer :nation="nation" @click="clicked(nation)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from "../store";
import { Nation } from "../Models/Nation";
import FlagDisplayer from "../components/FlagDisplayer.vue";
import NationModal from "../components/NationModal.vue";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  components: {
    NationModal,
    FlagDisplayer,
  },

  data(): {
    nationsInUse: Nation[] | null;
    originalNations: Nation[] | null;
    loading: boolean;
    addMostPopuloseFilter: boolean;
    searchword: string;
    selectedNation: Nation | null;
    loadModal: boolean;
  } {
    return {
      addMostPopuloseFilter: false,
      nationsInUse: null,
      loadModal: false,
      searchword: "",
      loading: true,
      originalNations: null,
      selectedNation: null,
    };
  },

  methods: {
    assembleFlagSrc(nation: Nation): string {
      return (
        "https://flagcdn.com/256x192/" + nation.cca2.toLowerCase() + ".png"
      );
    },

    clicked(nation: Nation) {
      this.selectedNation = nation;
      this.loadModal = true;
    },

    filterCountries() {
      this.nationsInUse = this.originalNations!.filter((x: Nation) =>
        x.name.common.toLowerCase().includes(this.searchword)
      );
      if (this.addMostPopuloseFilter) {
        this.nationsInUse = this.nationsInUse!.sort((a: Nation, b: Nation) => {
          if (a.population > b.population) {
            return -1;
          }
          if (a.population < b.population) {
            return 1;
          }
          return 0;
        });
      }
    },

    udpateFilters() {
      this.addMostPopuloseFilter = !this.addMostPopuloseFilter;
      this.filterCountries();
    },

    closeModal() {
      this.loadModal = false;
    },
  },

  async created() {
    await store.dispatch.getNations();

    this.nationsInUse = store.state.nations.nations;
    this.originalNations = store.state.nations.nations;

    this.nationsInUse = this.nationsInUse.sort((a: Nation, b: Nation) => {
      if (a.name.common < b.name.common) {
        return -1;
      }
      if (a.name.common > b.name.common) {
        return 1;
      }
      return 0;
    });

    console.log(this.nationsInUse);

    this.loading = false;
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flag-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
}
.zoom {
  padding: 50px;
  transition: transform 0.2s;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.main-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
}

.button-active {
  right: 3px;
  top: 3px;
  bottom: 3px;
  border: 0;
  background: #0f9c45;
  color: #fff;
  outline: none;
  margin: 0;
  padding: 0 10px;
  border-radius: 100px;
}

.button-not-active {
  right: 3px;
  top: 3px;
  bottom: 3px;
  border: 0;
  background: #82a6c9;
  color: #fff;
  outline: none;
  margin: 0;
  padding: 0 10px;
  border-radius: 100px;
}

.modal-wrapper {
  -webkit-animation: fadein 1s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 1s; /* Firefox < 16 */
  -ms-animation: fadein 1s; /* Internet Explorer */
  -o-animation: fadein 1s; /* Opera < 12.1 */
  animation: fadein 1s;
  z-index: 1;
  height: 100%;
  width: 100%;
  position: absolute;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Firefox < 16 */
@-moz-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Internet Explorer */
@-ms-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.input-wrapper {
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
}

.zoom:hover {
  -ms-transform: scale(1.2); /* IE 9 */
  -webkit-transform: scale(1.2); /* Safari 3-8 */
  transform: scale(1.2);
}

.form-wrapper {
  position: relative;
  width: 300px;
}

.search-input {
  width: 50%;
  border: 1px solid #ccc;
  border-radius: 100px;
  padding: 10px 20px 10px 20px;
  line-height: 1;
  box-sizing: border-box;
  outline: none;
}
</style>
