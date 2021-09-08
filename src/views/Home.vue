<template>
  <div class="list">
    <p>{{ bookCount }}件の読書情報が記録されています。</p>
    <BookInfo
        v-for="(b, i) of state.books"
        :key="b.id"
        :book="b"
        :index="i + 1"
        :linkable="true"
    ></BookInfo>
    <div>
      <el-pagination
          :page-size="3"
          :total="bookCount"
          background
          layout="prev, pager, next"
          @current-change="onchange"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, reactive} from 'vue';
import Book from '@/modules/Book';
import BookInfo from '@/components/BookInfo.vue';
import {useStore} from '@/store';

type State = {
  books: Book[],
}

const Home = defineComponent({
  name: 'home',
  components: {
    BookInfo,
  },
  setup() {
    // store
    const store = useStore();

    // state
    const state = reactive<State>({
      books: []
    });

    // computed
    const bookCount = computed<number>(() => store.getters.bookCount);
    const getRangeByPage = (page: number) => store.getters.getRangeByPage(page);

    // methods
    const onchange = (page: number) => {
      state.books = getRangeByPage(page);
    }

    return {
      bookCount,
      onchange,
      store,
      state,
    }
  }
})

export default Home;
</script>
