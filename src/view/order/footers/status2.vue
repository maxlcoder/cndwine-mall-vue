<template>
  <div slot="footer" class="order_list--footer_btn">
    <van-button size="small" @click="$emit('handle', 'refundOrder')">申请退款</van-button>
    <van-button
      size="small"
      type="danger"
      @click="$emit('handle', 'reminderOrder')"
      :disabled="!reminder">
      提醒发货
    </van-button>
  </div>
</template>

<script>
import { Button } from 'vant';

export default {
  name: 'status2',
  components: {
    [Button.name]: Button,
  },
  props: {
    reminder: Boolean,
  },
};
</script>
