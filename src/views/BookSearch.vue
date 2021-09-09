<template>
  <div id="search">
    <el-form :inline="true">
      <el-form-item label="キーワード">
        <el-input
            v-model="data.keyword"
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
        v-for="(b, i) of data.books"
        :key="b.id"
        :book="b"
        :index="i + 1"
        :linkable="true"
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
    // data
    const data = reactive<State>({
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
          'https://www.googleapis.com/books/v1/volumes?q=' + data.keyword
      )
          .then((result) => {
            data.books = [];
            if (result.status != 200) {
              throw new GoogleApiResponseError('status is not 200. status=' + result.status);
            }

            const body: GoogleApiBook = result.data;
            if (!body.items) {
              return;
            }
            for (let b of body.items) {
              data.books.push(
                  Book.constructorFromGoogleApiBook(b)
              );
            }
          });
    };

    return {
      data,
      onclick,
    };
  }

});

export default BookSearch;
</script>

<style scoped>
#search form {
  margin-top: 15px;
}
</style>
