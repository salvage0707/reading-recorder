<template>
<div id="search">
  <el-form :inline="true">
    <el-form-item label="キーワード">
      <el-input
          type="text"
          size="large"
          v-model="state.keyword"
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
      :book="b"
      :index="i + 1"
      :key="b.id"
  ></BookInfo>
</div>
</template>

<script lang="ts">
import {defineComponent, inject, reactive} from 'vue'
import Book from "@/modules/Book";
import BookInfo from '@/components/BookInfo.vue';
import {GoogleApiBook} from "@/types/GoogleApiBook";
import {httpKey} from '@/injectkeys/httpkey';

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
    const state =  reactive<State>({
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
        const data: GoogleApiBook = result.data;
        state.books = []
        if (!data.items) {
          return;
        }
        for (let b of data.items) {
          state.books.push(
            Book.constructorFromGoogleApiBook(b)
          )
        }
      })
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