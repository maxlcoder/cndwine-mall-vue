<template>
  <div slot="footer" class="order_list--footer_btn">
    <van-button size="small" @click="$emit('goBack')">返回</van-button>
  </div>
</template>

<script>
import { Button } from 'vant';

export default {
  name: 'status5',
  components: {
    [Button.name]: Button,
  },
};
</script>
