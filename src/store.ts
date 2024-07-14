import { createStore, Commit } from 'vuex';

// Define types
interface State {
  isLoading: boolean;
}

// Define mutations
enum MutationTypes {
  SET_LOADING = 'SET_LOADING',
}

interface Mutations {
  [MutationTypes.SET_LOADING](state: State, payload: boolean): void;
}

// Define actions
enum ActionTypes {
  SET_LOADING = 'SET_LOADING',
}

interface Actions {
  [ActionTypes.SET_LOADING]({ commit }: { commit: Commit }, payload: boolean): void;
}

// Define getters
interface Getters {
  isLoading(state: State): boolean;
}

// Initial state
const initialState: State = {
  isLoading: false,
};

// Vuex store instance
const store = createStore<State>({
  state: initialState,
  mutations: {
    [MutationTypes.SET_LOADING](state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
    [ActionTypes.SET_LOADING]({ commit }, payload) {
      commit(MutationTypes.SET_LOADING, payload);
    },
  },
  getters: {
    isLoading: (state) => state.isLoading,
  },
});

export default store;

// Export types for composition API usage
export { State, Mutations, Actions, Getters };