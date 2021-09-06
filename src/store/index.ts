import {InjectionKey} from 'vue';
import {createStore, Store, useStore as baseUseStore} from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Book from '@/modules/Book';
import {UPDATE_BOOK, UPDATE_CURRENT} from './mutation-types';

interface State {
    books: Book[];
    current: Book | null;
}

interface CustomStoreOptions {
    state: State;
    getters: {
        bookCount(): number,
        allBooks(): Book[],
        getRangeByPage(): Book[],
        getBookById(id: string): Book,
        current(): Book,
    };
    mutations: {
        [UPDATE_CURRENT](state: State, payload: Book): void,
        [UPDATE_BOOK](state: State, payload: Book): void,
    };
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    strict: true,
    state: {
        books: [],
        current: null,
    },
    getters: {
        bookCount(state: State) {
            return state.books.length;
        },
        allBooks(state: State) {
            return state.books;
        },
        getRangeByPage(state: State) {
            return (page: number) => {
                const SIZE = 3;
                return state.books.slice((page - 1) * SIZE, (page - 1) * SIZE * SIZE);
            };
        },
        getBookById(state: State) {
            return (id: string) => {
                return state.books.find((book) => book.id === id);
            };
        },
        current(state: State) {
            return state.current;
        },
    },
    mutations: {
        [UPDATE_CURRENT](state: State, payload: Book) {
            state.current = payload;
        },
        [UPDATE_BOOK](this: CustomStoreOptions, state: State, payload: Book) {
            if (payload.id == null) {
                return;
            }

            const b = this.getters.getBookById(payload.id);
            if (b) {
                Object.assign(b, payload);
            } else {
                state.books.push(payload);
            }
        },
    },
    actions: {
        [UPDATE_CURRENT]({commit}, payload: Book) {
            commit(UPDATE_CURRENT, payload);
        },
        [UPDATE_BOOK]({commit}, payload: Book) {
            commit(UPDATE_BOOK, payload);
        },
    },
    plugins: [
        createPersistedState({
            key: 'reading-recorder',
            storage: localStorage,
        }),
    ],
});

export function useStore() {
    return baseUseStore(key);
}
