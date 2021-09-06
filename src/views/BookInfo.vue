<template>
  <div class="clearfix" :class="{ linkable }" @click="onclick">
    <div class="image">
      <img alt="book_image" :src="book.image"/>
    </div>
    <div class="details">
      <ul>
        <li v-if="index">{{ index }}.</li>
        <li>{{ book.title }}（{{ book.price.get() }}）</li>
        <li>{{ book.author }}</li>
        <li>{{ book.publisher }}</li>
        <li>{{ book.published }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import {mapActions} from 'vuex'
import {UPDATE_CURRENT} from "../store/mutation-types";
import Book from "../modules/Book";

export default defineComponent({
  name: 'book-info',
  props: {
    index: {
      type: Number,
    },
    linkable: {
      type: Boolean,
      default: false,
    },
    book: {
      type: Book,
    }
  },
  methods: {
    ...mapActions([UPDATE_CURRENT]),
    onclick() {
      if (this.linkable) {
        this[UPDATE_CURRENT](this.book);
        this.$router.push('/form');
      }
    }
  }
})
</script>

<style scoped>
.linkable:hover {
  cursor: pointer;
  background-color: #ff9;
}
</style>