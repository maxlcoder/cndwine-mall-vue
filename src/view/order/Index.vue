<template>
  <div class="order_list">
    <van-tabs
      sticky
      :active="state"
      :swipe-threshold="5"
      @click="onClick">
      <van-tab
        v-for="tab in tabsItem"
        :title="tab.name"
        :key="tab.type"
        :status="tab.status"></van-tab>
    </van-tabs>
    <van-list
      :immediate-check="false"
      :offset="100">
      <van-panel
        v-for="(order, i) in orders"
        :key="i"
        :title="'订单编号: ' + order.order_number"
        :status="getStatusText(order.state)">
        <div>
          <van-card
            v-for="(goods, goodsIndex) in order.orderItems"
            class="order_list--van-card"
            :key="goodsIndex"
            :title="goods.item_name"
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
          @handle="actionHandle($event, i)"/>
      </van-panel>
    </van-list>
  </div>
</template>

<script>
import { Tab, Tabs, Panel, Card, List } from 'vant';
import status1 from './footers/status1';
import status2 from './footers/status2';
import status3 from './footers/status3';
import status4 from './footers/status4';
import status5 from './footers/status5';
import status8 from './footers/status8';

const STATUS_TEXT = {
  1: '待支付',
  2: '待发货',
  3: '待收货',
  4: '完成',
  5: '退货申请',
  6: '退货中',
  7: '退货完成',
  8: '已取消',
};

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
    [status8.name]: status8,
  },

  data() {
    return {
      state: 0,
      orders: [],
      tabsItem: [
        {
          name: '全部',
          status: 0,
        },
        {
          name: '待付款',
          status: 1,
        },
        {
          name: '待发货',
          status: 2,
        },
        {
          name: '待收货',
          status: 3,
        },
        {
          name: '已完成',
          status: 4,
        },
      ],
    };
  },

  created() {
    // eslint-disable-next-line
    console.log(this.active);
    // eslint-disable-next-line
    console.log(this.$route.query);
    if (this.$route.query.state) {
      this.state = this.$route.query.state;
    }
    // 初始化列表
    this.changeItem(this.state);
  },

  methods: {
    assembleOrders(items) {
      return items.map(item => ({
        id: item.id,
        order_number: item.order_number,
        total_fee: item.total_fee,
        ship_fee: item.ship_fee,
        is_can_reminder: item.state === 2,
        state: item.state,
        orderItems: item.products.map(product => ({
          item_name: product.title,
          num: product.num,
          price: product.price,
          cover: product.cover,
        })),
      }));
    },
    onClick(index, title) {
      /* eslint-disable */
      console.log(index);
      this.$toast(title);
      // 加载列表
      this.changeItem(index);
    },
    toOrderShow(i) {
      /* eslint-disable */
      console.log(i);
      this.$router.push({name: 'OrderShow', params: { id: this.orders[i].id }});
    },
    toPay(i) {
      /* eslint-disable */
      this.$dialog.confirm({
        title: '支付确认',
        message: '是否支付该笔订单？'
      }).then(() => {
        console.log('Yes');
        // 支付
        this.$ajax
          .post('/api/orders/' + this.orders[i].id + '/pay')
          .then((response) => {
            if (response.data.code === 200) {
              console.log(response.data);
              window.location.href = response.data.item.pay_url;
            } else {
              // this.$toast('支付失败');
            }
          });
      }).catch((error) => {
        console.log(error);
        console.log('No');
      });
      console.log(i);
    },
    cancelOrder(i) {
      this.$dialog.confirm({
        title: '取消订单',
        message: '是否取消该笔订单？'
      }).then(() => {
        console.log('Yes');
        console.log(i);
        console.log(this.orders[i]);
        // 取消订单
        this.$ajax
          .put('/api/orders/' + this.orders[i].id + '/cancel')
          .then((response) => {
            if (response.data.code === 200) {
              this.$toast('取消成功');
              this.orders[i].state = 8;
            } else {
              this.$toast('取消失败');
            }
          });
      }).catch((error) => {
        console.log(error);
        console.log('No');
        this.$toast('您已取消');
      });
    },
    refundOrder(i) {
      this.$dialog.confirm({
        title: '申请退款',
        message: '是否确认申请退款？'
      }).then(() => {
        console.log('Yes');
        // 取消订单
        this.$ajax
          .post('/api/orders/' + this.orders[i].id + '/refund')
          .then((response) => {
            if (response.data.code === 200) {
              this.$toast('申请退款成功');
              this.orders[i].state = 5;
            } else if (response.data.code === 400) {
              this.$toast(response.data.msg);
            } else {
              this.$toast('申请退款失败');
            }
          });
      }).catch((error) => {
        console.log(error);
        console.log('No');
        this.$toast('您已取消');
      });
    },
    receiptOrder(i) {
      this.$dialog.confirm({
        title: '收货',
        message: '确认收货？'
      }).then(() => {
        console.log('Yes');
        console.log(i);
        console.log(this.orders[i]);
        // 取消订单
        this.$ajax
          .put('/api/orders/' + this.orders[i].id + '/receipt')
          .then((response) => {
            if (response.data.code === 200) {
              this.$toast('收货成功');
              this.orders[i].state = 4;
            } else {
              this.$toast('收货失败');
            }
          });
      }).catch((error) => {
        console.log(error);
        console.log('No');
        this.$toast('您已取消');
      });
    },
    reminderOrder(i) {
      this.orders[i].is_can_reminder = false;
      this.$toast('已提醒卖家发货, 请耐心等待哦~');
    },
    actionHandle(handle, i) {
      /* eslint-disable */
      console.log(handle);
      this[handle] && this[handle](i);
    },
    changeItem(state) {
      // 请求订单
      this.$ajax
        .get('/api/orders?state=' + state)
        .then((response) => {
          // eslint-disable-next-line
          this.orders = this.assembleOrders(response.data.items);
        });
    },
    getStatusText(state) {
      return STATUS_TEXT[state];
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
