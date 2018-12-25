<template>
  <div slot="footer" class="order_list--footer_btn">
    <van-button size="small" @click="$emit('handle', 'toOrderShow')">查看详情</van-button>
  </div>
</template>

<script>
import { Button } from 'vant';

export default {
  name: 'status4',
  components: {
    [Button.name]: Button,
  },
};
</script>
