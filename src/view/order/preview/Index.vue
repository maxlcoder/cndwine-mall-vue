<template>
	<div class="place_order_entity">
		<top-address @pushAddress="onSetAddress" style="margin-bottom: 20px;"/>
		<bottom-goods @pushPrice="onSetPrice" @pushCoupon="onSetCoupon"/>
		<van-submit-bar
			:price="payPrice"
			label="实付："
			buttonText="提交订单"
			:loading="isSubmit"
			:disabled="isDisabled"
			@submit="onSubmit"/>
	</div>
</template>

<script>
import { SubmitBar, Cell, CellGroup, Toast } from 'vant';
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
  },
  data() {
    return {
      totalPrice: 0,
      payPrice: 0,
      address_id: 0,
      isSubmit: false,
      isDisabled: false,
      coupon_code: '',
    };
  },
  created() {
    // eslint-disable-next-line
    console.log(this.$route.params);
  },
  methods: {
    onSetPrice(data) {
      // eslint-disable-next-line
      this.totalPrice = data.totalPrice * 100;
      this.payPrice = data.payPrice * 100;
    },
    onSetCoupon(data) {
      // eslint-disable-next-line
      this.coupon_code = data;
    },
    onSetAddress(data) {
      this.address_id = data;
    },
    onSubmit() {
      this.isSubmit = true;
      const queryGoods = JSON.parse(this.$route.query.goods);
      const params = {
        address_id: this.address_id,
        total_fee: this.totalPrice / 100,
        total_pay_fee: this.payPrice / 100,
        products: queryGoods,
        coupon_code: this.coupon_code,
      };
      this.$ajax
        .post('/api/orders', params)
        .then((response) => {
          if (response.data.code !== 200) {
            Toast.fail(response.data.msg);
          } else {
            Toast.success('提交订单成功');
            window.location.href = response.data.item.pay_url;
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
.place_order_entity {
  padding-bottom: 70px;
}
</style>
