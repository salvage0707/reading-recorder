<template>
  <div id="form">
    <BookInfo :book="data.book"></BookInfo>
    <hr/>

    <el-form
        ref="formRef"
        :model="data.form"
        :rules="data.rules"
        label-width="120px"
    >
      <el-form-item label="読了日">
        <el-date-picker
            v-model="data.form.read"
            type="date"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="感想" prop="memo">
        <el-input v-model="data.form.memo" size="large" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onsubmit">登録</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script lang="ts">
import {computed, createElementBlock, defineComponent, onMounted, reactive, ref} from 'vue';
import Book from '@/modules/Book';
import BookInfo from '@/components/BookInfo.vue';
import {useStore} from '@/store';
import {useRouter} from 'vue-router';
import BookRecord from '@/modules/BookRecord';
import Validator from '@/types/Validator';
import {UPDATE_BOOK, UPDATE_CURRENT} from '@/store/mutation-types';
import {ElNotification} from 'element-plus';

type State = {
  book: Book,
  form: BookRecord,
  rules: Record<string, Record<string, string | boolean>[]>
}

const BookFrom = defineComponent({
  name: 'book-form',
  components: {
    BookInfo
  },
  setup() {
    // state
    const state = useStore();
    // router
    const router = useRouter();

    // refs
    const formRef = ref<Validator | null>(null);

    // data
    const data = reactive<State>({
      book: new Book(),
      form: new BookRecord(new Date(), ''),
      rules: {
        memo: [
          {required: true, message: 'メモが未入力です', trigger: 'change'}
        ]
      }
    });

    // computed
    const current = computed(() => {
      return state.getters.current;
    });

    const getBookById = computed((id: string) => {
      return state.getters.getBookById(id);
    });

    // created
    if (!current) {
      router.push('/');
    }
    data.book = current.value;

    // mount
    onMounted(() => {
      let b: Book = state.getters.getBookById(data.book?.id);
      if (b?.record) {
        data.form = b.record;
      }
    });

    // methods
    const onsubmit = () => {
      formRef.value?.validate((isValid) => {
        if (isValid) {
          data.book.record = data.form;
          state.commit(UPDATE_BOOK, data.book);
          state.commit(UPDATE_CURRENT, null);

          ElNotification({
            title: 'Reading Recorder',
            message: createElementBlock(
                'p',
                {style: 'color: #000'},
                '読書情報の登録/更新に成功しました。',
            ),
            duration: 2000,
          });
          data.form = new BookRecord(new Date(), '');
          router.push('/');
        }
      });
    };

    return {
      formRef,
      data,
      current,
      getBookById,
      onsubmit,
    };
  }
});

export default BookFrom;
</script>

<style scoped>
#form {
  margin-top: 15px;
}
</style>
