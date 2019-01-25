<template>
	<div class="place_order_entity">
		<top-address @pushAddress="onSetAddress" style="margin-bottom: 20px;"/>
		<bottom-goods @pushPrice="onSetPrice" />
		<van-submit-bar
			:price="price"
			label="总计："
			buttonText="提交订单"
			:loading="isSubmit"
			:disabled="isDisabled"
			@submit="onSubmit"
		/>
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
      price: 0,
      address_id: 0,
      isSubmit: false,
      isDisabled: false,
    };
  },

  methods: {
    onSetPrice(data) {
      // eslint-disable-next-line
      this.price = data * 100;
    },
    onSetAddress(data) {
      this.address_id = data;
    },
    onSubmit() {
      this.isSubmit = true;
      // eslint-disable-next-line
      console.log(JSON.parse(this.$route.query.goods));
      // eslint-disable-next-line
      console.log(this.address_id);
      const queryGoods = JSON.parse(this.$route.query.goods);
      // this.$router.replace({ name: 'payment' });
      const params = {
        address_id: this.address_id,
        total_fee: this.price / 100,
        products: queryGoods,
      };
      this.$ajax
        .post('/api/orders', params)
        .then((response) => {
          // eslint-disable-next-line
          console.log(response);
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
