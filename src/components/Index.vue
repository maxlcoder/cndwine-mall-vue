<template>
  <div>
    <van-swipe
      :autoplay="3000"
      @change="onChange">
      <van-swipe-item
        v-for="image in images"
        :key="image.id">
        <img :src="image.url" @click="onClick(image.id)"/>
      </van-swipe-item>
    </van-swipe>
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item">
        <van-card
          num="2"
          price="2.00"
          desc="描述信息"
          title="商品标题"
          :thumb="imageURL"
        />
      </van-cell>
    </van-list>
    <van-tabbar v-model="active" @change="onChangeTab">
      <van-tabbar-item icon="shop">精选</van-tabbar-item>
      <van-tabbar-item icon="records" dot>分类</van-tabbar-item>
      <van-tabbar-item icon="cart" info="5">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" info="20">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {
  Swipe,
  SwipeItem,
  Lazyload,
  Card,
  List,
  Cell,
  Tabbar,
  TabbarItem,
} from 'vant';

export default {
  name: 'Index',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Lazyload.name]: Lazyload,
    [Card.name]: Card,
    [List.name]: List,
    [Cell.name]: Cell,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  data() {
    return {
      images: [
        {
          id: 1,
          url: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg',
        },
        {
          id: 2,
          url: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg',
        },
      ],
      current: 1,
      imageURL: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg',
      list: [],
      loading: false,
      finished: false,
      active: 0,
    };
  },
  methods: {
    onChangeTab(index) {
      // eslint-disable-next-line
      console.log(index);
      switch (index) {
        case 0:
          return this.$router.push({ path: '/' });
        case 1:
          return this.$router.push({ path: 'addresses' });
        case 2:
          return this.$router.push({ path: 'cart' });
        case 3:
          return this.$router.push({ path: '/user' });
        default:
          return this.$router.push({ path: '/' });
      }
    },
    onChange(index) {
      // eslint-disable-next-line
      console.log(index);
      this.current = index;
    },
    onClick(id) {
      // eslint-disable-next-line
      console.log(this.current + 'fff');
      this.$router.push({ path: `/goods/${id}` });
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i += 1) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
