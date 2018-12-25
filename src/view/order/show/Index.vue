<template>
	<div class="place_order_entity">
    <van-panel title="订单详情" :status="stateTip">
      <van-cell-group>
        <van-cell
          icon="location"
          is-link
          :title="address.contact_name + '  ' + address.contact_cellphone"
          :label="address.address" />
      </van-cell-group>
      <div class="order-goods">
        <van-card
          v-for="item in goods"
          :key="item.sku_id"
          :title="item.title"
          :desc="item.description"
          :num="item.num"
          :price="item.price"
          :thumb="item.cover"
        >
        </van-card>

        <van-cell-group>
          <van-cell title="商品金额">
            <span class="red">¥{{ totalPrice }}</span>
          </van-cell>
          <van-cell title="运费">¥{{ shipFee }}</van-cell>
        </van-cell-group>
      </div>
    </van-panel>
	</div>
</template>

<script>
import { SubmitBar, Cell, CellGroup, Toast, Card, Panel } from 'vant';
import topAddress from './Top';
import bottomGoods from './Bottom';

export default {
  components: {
    [SubmitBar.name]: SubmitBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [topAddress.name]: topAddress,
    [bottomGoods.name]: bottomGoods,
    [Toast.name]: Toast,
    [Card.name]: Card,
    [Panel.name]: Panel,
  },
  data() {
    return {
      address: {},
      goods: [],
      price: 0,
      remark: '',
      totalPrice: 0,
      shipFee: 0,
      stateTip: '',
    };
  },

  created() {
    /* eslint-disable */
    console.log(this.$router);
    console.log(this.$route.params);
    if (this.$route.params.id) {
      this.order_id = this.$route.params.id;
      // 获取订单商品
      this.$ajax
        .get(`/api/orders/${this.order_id}`)
        .then((response) => {
          // eslint-disable-next-line
          console.log(response.data.item);
          const order = response.data.item;
          this.address = {
            contact_name: order.contact_name,
            contact_cellphone: order.contact_name,
            address: order.address,
          };
          this.goods = order.items;
          this.totalPrice = order.total_fee;
          this.shipFee = order.ship_fee;
          this.stateTip = order.state_tip;
        });
    }
  },

  methods: {
  
  },
};
</script>


<style lang="less" scoped>
.place_order_entity {
  padding-bottom: 70px;
}
</style>
