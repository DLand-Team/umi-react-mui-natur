import { ThunkParams } from "natur";

const state = {
    value: 0,
}

type State = typeof state;

const actions = {
    inc: () => ({getState}: ThunkParams<State>) => {
        return {
            value: getState().value + 1,
        }
    }
}

export default {
    state,
    actions,
}