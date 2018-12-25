<template>
  <div class="order_list">
    <van-panel
      :title="'订单编号: ' + order.order_number">
      <div>
        <van-card
          v-for="(goods, goodsIndex) in orderItems"
          class="order_list--van-card"
          :key="goodsIndex"
          :title="goods.name"
          :num="goods.num"
          :price="goods.price"
          :thumb="goods.cover"
          @click.native="toOrderDetail(i)"/>
          <div class="order_list--total">
            合计: {{ order.total_fee }}元（含运费{{ order.ship_fee }}元）
          </div>
      </div>
      <component
        slot="footer"
        :is="'status' + order.state"
        :reminder="order.is_can_reminder"
        @goBack="goBack"/>
    </van-panel>
  </div>
</template>

<script>
import { Tab, Tabs, Panel, Card, List } from 'vant';
import status1 from './footers/status1';
import status2 from './footers/status2';
import status3 from './footers/status3';
import status4 from './footers/status4';
import status5 from './footers/status5';

export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Panel.name]: Panel,
    [Card.name]: Card,
    [List.name]: List,
    [status1.name]: status1,
    [status2.name]: status2,
    [status3.name]: status3,
    [status4.name]: status4,
    [status5.name]: status5,
  },

  props: {
    active: {
      type: [String, Number],
      default: 0,
    },
  },

  data() {
    return {
      order_id: 0,
      order: {
        order_number: '',
        state: 1,
        total_fee: 0,
        ship_fee: 0,
        is_can_reminder: 0,
      },
      orderItems: [
        {
          name: '',
          num: 0,
          price: 0,
          cover: '',
        },
      ],
    };
  },

  created() {
    /* eslint-disable */
    console.log(this.$route.params);
    if (this.$route.params.id) {
      this.order_id = this.$route.params.id;
    }
    console.log
    if (this.order.status === 4) {
      this.order.status = 5; // 转换状态
    }
    // 数据初始化
    this.$ajax
      .get('/api/orders/' + this.order_id)
      .then((response) => {
        // eslint-disable-next-line
        console.log(response.data.items);
      });
  },

  methods: {
    onClick(index, title) {
      /* eslint-disable */
      console.log(status);
      this.$toast(title);
      // 加载列表
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.order_list {
  padding-bottom: 0;
  &--footer_btn {
    text-align: right;
  }
  &--panel {
    margin-bottom: 10px;
  }

  &--van-card {
    background-color: #fafafa;
  }

  &--total {
    text-align: right;
    padding: 10px;
  }
}
</style>
