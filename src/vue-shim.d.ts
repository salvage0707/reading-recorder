import {Store} from 'vuex';
import Book from '@/modules/Book';

declare module '@vue/runtime-core' {
  // ストアのステートを宣言する
  interface State {
    books: Book[];
    current: Book | null;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
    // $http:
    // $http: fetch;
  }
}
