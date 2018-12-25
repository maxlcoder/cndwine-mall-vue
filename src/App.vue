<template>
  <div id="app">
    <van-nav-bar
      title="建发酒业商城"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <router-view/>
    <van-tabbar v-model="active" @change="onChangeTab">
      <van-tabbar-item icon="shop">精选</van-tabbar-item>
      <van-tabbar-item icon="cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { NavBar, Tabbar, TabbarItem } from 'vant';

export default {
  name: 'App',
  components: {
    [NavBar.name]: NavBar,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  methods: {
    onClickLeft() {
      if (this.$route.name === 'OrderShow') {
        this.$router.replace({ path: '/orders' });
        return true;
      }
      this.$router.go(-1);
      return true;
    },
    onChangeTab(index) {
      // eslint-disable-next-line
      console.log(index);
      switch (index) {
        case 0:
          return this.$router.push({ path: '/' });
        case 1:
          return this.$router.push({ path: '/cart' });
        case 2:
          return this.$router.push({ path: '/user' });
        default:
          return this.$router.push({ path: '/' });
      }
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
