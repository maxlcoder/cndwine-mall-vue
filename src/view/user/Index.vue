<template>
  <div>
    <div class="user-poster">
      <div>
        <p>{{ user.name }}</p>
      </div>
    </div>
    <van-row class="user-links">
      <van-col span="6">
        <router-link to="/orders?state=1"><van-icon name="pending-payment" />待付款</router-link>
      </van-col>
      <van-col span="6">
        <router-link to="/orders?state=2"><van-icon name="logistics" />待发货</router-link>
      </van-col>
      <van-col span="6">
        <router-link to="/orders?state=3"><van-icon name="goods-collect-o" />待收货</router-link>
      </van-col>
      <van-col span="6">
        <router-link to="/orders?state=4"><van-icon name="home-o" />已完成</router-link>
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <router-link to="/orders?state=0">
        <van-cell icon="records" title="全部订单"
          is-link />
      </router-link>
      <router-link to="/addresses">
        <van-cell
          icon="location"
          title="收货地址"
          is-link />
      </router-link>
    </van-cell-group>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup } from 'vant';

export default {
  data() {
    return {
      user: {
        id: 0,
        name: '',
        avatar: 'https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png',
      },
    };
  },
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
  created() {
    this.initUser();
  },

  methods: {
    initUser() {
      this.$ajax
        .get('/api/user')
        .then((response) => {
          // eslint-disable-next-line
          console.log(response.data.item);
          this.user.id = response.data.item.id;
          this.user.name = response.data.item.name;
        });
    },
  },
};
</script>

<style lang="less">
.user {
  &-poster {
    text-align: center;
    height: 150px;
    width: 100%;
    display: block;
    background-image: url('https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png');
    div {
      padding-top: 20px;
      text-align: center;
      img {
        width: 100%;
      }
    }
  }

  &-group {
    margin-bottom: 15px;
  }

  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;

    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
</style>
