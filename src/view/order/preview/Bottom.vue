<template>
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
			<van-field v-model="remark" placeholder="请输入备注" label="订单备注">
			</van-field>
			<van-cell title="商品金额">
				<span class="red">{{ totalPrice }}</span>
			</van-cell>
			<van-cell title="运费" value="¥0.00"></van-cell>
		</van-cell-group>
	</div>
</template>

<script>
import { Card, Field, Cell, CellGroup } from 'vant';

export default {
  name: 'bottom-goods',
  components: {
    [Card.name]: Card,
    [Field.name]: Field,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
  data() {
    return {
      remark: '',
      goods: [],
      totalPrice: 0,
    };
  },
  created() {
    this.initGoods();
    this.calTotalPrice();
  },
  methods: {
    initGoods() {
      // console.log(this.$route.query.goods);
      this.goods = JSON.parse(this.$route.query.goods);
      // eslint-disable-next-line
      console.log(this.goods);
    },
    calTotalPrice() {
      const price = this.goods.reduce((total, item) => total + (item.price * item.num), 0);
      // eslint-disable-next-line
      console.log(price);
      this.$emit('pushPrice', price);
      this.totalPrice = price;
      return price;
    },
  },
};
</script>
<style lang="less" scoped>
.order-goods {
  background-color: #fff;
}
</style>
