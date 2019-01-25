<template>
  <div>
    <van-swipe
      :autoplay="3000"
      @change="onChange"
      class="swipe">
      <van-swipe-item
        v-for="item in swipes"
        :key="item.id">
        <van-cell @click="onClick(item.id)">
          <img :src="item.cover"/>
        </van-cell>
      </van-swipe-item>
    </van-swipe>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item.id"
        @click="onClick(item.id)">
        <van-card
          :price="item.price"
          :desc="item.description"
          :title="item.title"
          :thumb="item.cover"
        >
          <div slot="footer">
            <van-button round plain type="danger" size="small">马上秒</van-button>
          </div>
        </van-card>
      </van-cell>
    </van-list>
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
  Button,
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
    [Button.name]: Button,
  },
  data() {
    return {
      swipes: [],
      list: [],
      loading: false,
      finished: false,
      active: 0,
    };
  },

  created() {
    this.initList();
  },
  methods: {
    initList() {
      // 请求商品列表
      this.$ajax
        .get('/api/products/swipe')
        .then((response) => {
          this.swipes = this.assembleList(response.data.items);
        });
      // 请求商品列表
      this.$ajax
        .get('/api/products/choiceness')
        .then((response) => {
          this.list = this.assembleList(response.data.items);
        });
    },
    assembleList(items) {
      return items.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        cover: item.cover,
        description: item.description,
      }));
    },
    onChange(index) {
      this.current = index;
    },
    onClick(id) {
      this.$router.push({ path: `/goods/${id}` });
    },
    onLoad() {
      setTimeout(() => {
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        this.finished = true;
      }, 500);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.swipe {
  img {
    width: 100%;
    display: block;
    box-sizing: border-box;
    background-color: white;
    pointer-events: none;
  }
  .van-cell {
    padding: 0px;
  }
}
.van-card {
  &__footer {
    z-index: 1;
    float: right;
    right: 10%;
    margin-top: -40px;
  }
}
</style>
