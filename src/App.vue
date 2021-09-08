<template>
  <div id="app">
    <h2>Reading Recorder</h2>
    <!-- メインメニューを定義 -->
    <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        mode="horizontal"
        text-color="#fff"
    >
      <el-menu-item index="1">
        <router-link to="/">Home</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/search">Search</router-link>
      </el-menu-item>
      <el-sub-menu index="3">
        <!--        <template>Support</template>-->
        <el-menu-item index="3-1">
          <a href="https://wings.msn.to/" target="help">Author</a>
        </el-menu-item>
        <el-menu-item index="3-2">
          <a href="https://www.sbcr.jp/" target="help">Publisher</a>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>

    <router-view/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'app',
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a {
  color: #42b983;
}
</style>
