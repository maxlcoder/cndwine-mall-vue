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
      <van-field
        v-model="coupon_code"
        clearable
        placeholder="请输入优惠码"
        label="优惠码">
        <template #button>
          <van-button size="small" type="primary" @click="checkCoupon">确认</van-button>
        </template>
			</van-field>
      <van-cell title="优惠" :value="couponPrice" v-if="isCoupon"></van-cell>
		</van-cell-group>
	</div>
</template>

<script>
import { Card, Field, Cell, CellGroup, Button, Toast } from 'vant';

export default {
  name: 'bottom-goods',
  components: {
    [Card.name]: Card,
    [Field.name]: Field,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Toast.name]: Button,
  },
  data() {
    return {
      remark: '',
      goods: [],
      totalPrice: 0,
      coupon_code: '',
      isCoupon: false,
      couponPrice: 0,
    };
  },
  created() {
    this.initGoods();
    this.calTotalPrice();
  },
  methods: {
    initGoods() {
      this.goods = JSON.parse(this.$route.query.goods);
    },
    calTotalPrice() {
      const price = this.goods.reduce((total, item) => total + (item.price * item.num), 0);
      this.$emit('pushPrice', { totalPrice: price, payPrice: price });
      this.totalPrice = price.toFixed(2);
      return price;
    },
    checkCoupon() {
      if (this.coupon_code === '') {
        Toast.fail('请填写优惠码');
        return;
      }
      const params = {
        coupon_code: this.coupon_code,
      };
      this.$ajax
        .post('/api/coupons/check', params)
        .then((response) => {
          if (response.data.code !== 200) {
            Toast.fail(response.data.msg);
          } else {
            this.isCoupon = true;
            this.couponPrice = '- ¥' + response.data.item.price.toFixed(2);
            const tempPayPrice = this.totalPrice - response.data.item.price;
            this.$emit('pushPrice', { totalPrice: this.totalPrice, payPrice: tempPayPrice });
            this.$emit('pushCoupon', this.coupon_code);
          }
        }).catch((error) => {
          // 由网络或者服务器抛出的错误
          Toast(error.toString());
        });
    },
  },
};
</script>
<style lang="less" scoped>
.order-goods {
  background-color: #fff;
}
</style>
