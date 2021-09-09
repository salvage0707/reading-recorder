<template>
  <div :class="{ linkable }" class="clearfix" @click="onclick">
    <div class="image">
      <img :src="book.image" alt="book_image"/>
    </div>
    <div class="details">
      <ul>
        <li v-if="index">{{ index }}.</li>
        <li>{{ book.title }}（{{ getPrice }}）</li>
        <li>{{ book.author }}</li>
        <li>{{ book.publisher }}</li>
        <li>{{ book.published }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {mapActions} from 'vuex';
import {UPDATE_CURRENT} from '@/store/mutation-types';
import Book from '../modules/Book';

const BookInfo = defineComponent({
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
      type: Object as PropType<Book>,
    }
  },
  computed: {
    getPrice(): string | undefined {
      return this.book?.price?.get();
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
});

export default BookInfo;
</script>

<style scoped>
.linkable:hover {
  cursor: pointer;
  background-color: #ff9;
}

.image {
  float: left;
}

.image img {
  height: 180px;
}

.details {
  float: left;
}

.details li {
  list-style-type: none;
  text-align: left;
}

.clearfix {
  width: 100%;
  margin-bottom: 10px;
}

.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
</style>
