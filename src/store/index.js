import Vue from 'vue';
import Vuex from 'vuex';
import env from './../env';
import { detailsFactory } from './modules/details';
import { socketsFactory } from './modules/sockets';
import { trackersFactory } from './modules/trackers';

Vue.use(Vuex);

export function storeFactory() {
    const strict = env.nodeEnv !== 'production';

    return new Vuex.Store({
        modules: {
            details: detailsFactory(),
            sockets: socketsFactory(),
            trackers: trackersFactory(),
        },
        strict,
    });
}

const store = storeFactory();
export default store;
