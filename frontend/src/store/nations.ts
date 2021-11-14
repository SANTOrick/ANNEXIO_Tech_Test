import nationsProxyApi from "@/axios/nations.proxy.api"
import { Nation } from "@/Models/Nation"
import { defineModule } from "direct-vuex"
import store, { moduleActionContext, moduleGetterContext } from "./index"

export interface Nations {
    nations: Nation[];
}

const palindrome = defineModule({
    state: (): Nations => {
        return {
            nations: []
        }
    },
    getters: {
        selectedList(...args): Nation[] {
            // eslint-disable-next-line
            const { state, getters, rootState, rootGetters } = mod1GetterContext(args)
            return state.nations;
        }

    },
    mutations: {
        SAVE_LIST_OF_NATIONS(state, resp: Nation[]) {
            state.nations = resp;
        }
    },
    actions: {

        async getNations(context): Promise<boolean> {

            // eslint-disable-next-line
            const { dispatch, commit, getters, state } = mod1ActionContext(context);

            const result = await nationsProxyApi.getNations();
            commit.SAVE_LIST_OF_NATIONS(result);


            return true;
        }
    }
})

export default palindrome
// eslint-disable-next-line
const mod1GetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, palindrome)
// eslint-disable-next-line
const mod1ActionContext = (context: any) => moduleActionContext(context, palindrome)