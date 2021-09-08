<template>
  <div id="search">
    <el-form :inline="true">
      <el-form-item label="キーワード">
        <el-input
            v-model="state.keyword"
            size="large"
            type="text"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
            type="primary"
            @click="onclick"
        >
          検索
        </el-button>
      </el-form-item>
    </el-form>
    <hr/>

    <BookInfo
        v-for="(b, i) of state.books"
        :key="b.id"
        :book="b"
        :index="i + 1"
    ></BookInfo>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject, reactive} from 'vue';
import Book from '@/modules/Book';
import BookInfo from '@/components/BookInfo.vue';
import {GoogleApiBook} from '@/types/GoogleApiBook';
import {httpKey} from '@/injectkeys/httpkey';
import GoogleApiResponseError from '@/types/GoogleApiResponseError';

type State = {
  keyword: string,
  books: Book[],
}

const BookSearch = defineComponent({
  name: 'book-search',
  components: {
    BookInfo,
  },
  setup() {
    // state
    const state = reactive<State>({
      keyword: 'vue.js',
      books: []
    });

    // inject providers
    // http function
    const http = inject(httpKey);
    if (!http) {
      throw new Error('Not found provide object');
    }

    // methods
    const onclick = () => {
      http.get(
          'https://www.googleapis.com/books/v1/volumes?q=' + state.keyword
      )
          .then((result) => {
            state.books = [];
            if (result.status != 200) {
              throw new GoogleApiResponseError('status is not 200. status=' + result.status);
            }

            const data: GoogleApiBook = result.data;
            if (!data.items) {
              return;
            }
            for (let b of data.items) {
              state.books.push(
                  Book.constructorFromGoogleApiBook(b)
              );
            }
          });
    }

    return {
      state,
      onclick,
    }
  }

})

export default BookSearch;
</script>

<style scoped>
#search form {
  margin-top: 15px;
}
</style>
