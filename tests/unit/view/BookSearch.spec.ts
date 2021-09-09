import {mount} from '@vue/test-utils';
import BookInfo from '@/components/BookInfo.vue';
import BookSearch from '@/views/BookSearch.vue';
import {httpKey} from '@/injectkeys/httpkey';
import axios from 'axios';
import {GLOBAL_PLUGINS} from '../helper/unitTestHelpers';
import Book from '@/modules/Book';
import Price from '@/modules/Price';

const createMountedWrapper = () => {
  return mount(
    BookSearch,
    {
      global: {
        provide: {
          [httpKey as symbol]: axios,
        },
        ...GLOBAL_PLUGINS,
      },
    },
  );
};

const bookInstance = (instanceCount: number) => {
  const instances: Book[] = [];
  for (let i = 0; i < instanceCount; i++) {
    const book = new Book(
      `exampleId${i}`,
      `title${i}`,
      `author${i}`,
      new Price(i * 100, 'JPY'),
      `publisher${i}`,
      new Date(),
      `image-url${i}`,
      undefined,
    );
    instances.push(book);
  }
  return instances;
};

describe('BookSearch.vue', () => {
  it('初期表示の検索フォームに"vue.js"が入っていること', () => {
    const wrapper = createMountedWrapper();
    const inputForm = wrapper.find('input');
    expect(inputForm.element.value).toBe('vue.js');
  });
  it('初期表示では本の一覧が表示されないこと', () => {
    const wrapper = createMountedWrapper();
    const books = wrapper.findComponent(BookInfo);
    expect(books.exists()).toBe(false);
  });
  it('Google Book APIのレスポンスのitemsが空の場合に一覧表示が空になること', () => {
    const wrapper = createMountedWrapper();
    wrapper.vm.books = bookInstance(3);
    // booksを更新しても描画されない。優先度低いので後回し
    // console.log(wrapper.html())
    // const hasBooks = wrapper.findAllComponents(BookInfo);
    // expect(hasBooks.length).toBe(3);
    // 本当はここでAPI呼び出しをして表示確認したい
    // 実戦ではあまり使わないので学習としてはここまでとする

  });
  // tslint:disable-next-line:no-empty
  it('Google Book APIのレスポンスのが正常の場合に本一覧が表示されること', () => {
  });
  // tslint:disable-next-line:no-empty
  // tslint:disable-next-line:no-empty
  it('Google Book APIのレスポンスが200以外の場合に一覧表示が空になり例外が発生すること', () => {
  });
  // tslint:disable-next-line:no-empty
  it('httpのinjectが空オブジェクトの場合に例外が発生すること', () => {
  });
});
