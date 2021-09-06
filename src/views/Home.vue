<template>
  <div class="list">
    <p>{{ bookCount }}件の読書情報が記録されています。</p>
    <BookInfo
        v-for="(b, i) of state.books"
        :linkable="true"
        :book="b"
        :index="i + 1"
        :key="b.id"
    ></BookInfo>
    <div>
      <el-pagination
          background
          layout="prev, pager, next"
          :total="bookCount"
          :page-size="3"
          @current-change="onchange"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, reactive} from 'vue'
import Book from "@/modules/Book";
import BookInfo from '@/components/BookInfo.vue';
import {useStore} from "@/store";

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
