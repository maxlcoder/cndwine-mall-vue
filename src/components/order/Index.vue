<template>
  <div class="order_list">
    <van-tabs
      sticky
      :active="activeIndex"
      :swipe-threshold="5">
      <van-tab
        v-for="tab in tabsItem"
        :title="tab.name"
        :key="tab.type"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs, Panel, Card, List } from 'vant';

// const STATUS_TEXT = {
//   1: '待付款',
//   2: '待发货',
//   3: '待收货',
//   4: '已完成',
//   5: '退款成功',
//   6: '交易关闭',
//   7: '交易关闭',
// };

export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Panel.name]: Panel,
    [Card.name]: Card,
    [List.name]: List,
  },

  props: {
    active: {
      type: [String, Number],
      default: 0,
    },
  },

  data() {
    const activeIndex = this.active;
    return {
      shop_id: 1,
      activeIndex,
      items: [],
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
