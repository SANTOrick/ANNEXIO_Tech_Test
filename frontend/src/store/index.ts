import { createDirectStore } from "direct-vuex"
import  nations  from "./nations"

const {
  store,
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext
} = createDirectStore({
  modules: {
    nations
  }
})

// Export the direct-store instead of the classic Vuex store.
export default store;

// The following exports will be used to enable types in the
// implementation of actions and getters.
export {
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext
}

// The following lines enable types in the injected store '$store'.
export type AppStore = typeof store
declare module "vuex" {
  interface Store<S> {
    direct: AppStore;
  }
}