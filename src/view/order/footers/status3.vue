<template>
	<div slot="footer" class="order_list--footer_btn">
		<van-button size="small" @click="showLogistics">查看物流</van-button>
		<van-button
			size="small"
			type="danger"
			@click="$emit('handle', 'receiptOrder')">
			确认收货
		</van-button>
	</div>
</template>

<script>
import { Button } from 'vant';

export default {
  name: 'status3',
  components: {
    [Button.name]: Button,
  },
  methods: {
    showLogistics() {
      this.$toast('此功能开发中');
    },
  },
};
</script>
