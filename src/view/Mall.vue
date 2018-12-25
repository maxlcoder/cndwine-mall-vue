<template>
  <div>
    <van-notice-bar
      text="即将上线..."
      left-icon="//img.yzcdn.cn/vant/volume.png"
    />
    <van-collapse v-model="activeNames">
      <van-collapse-item title="建发酒业商城" name="1">
        建发酒业商城...
        <p>{{ api_token }}</p>
        <van-button type="primary" @click="toPay">测试</van-button>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import {
  NoticeBar,
  Collapse,
  CollapseItem,
  Button,
} from 'vant';

export default {
  name: 'Mall',
  components: {
    [NoticeBar.name]: NoticeBar,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Button.name]: Button,
  },
  data() {
    return {
      api_token: '',
      activeNames: ['1'],
    };
  },

  created() {
    // eslint-disable-next-line
      console.log(window.Laravel.api_token);
    this.api_token = typeof window.Laravel.api_token === 'undefined' ? '' : window.Laravel.api_token;
  },

  methods: {
    toPay() {
      // eslint-disable-next-line
      console.log('开始支付');
      // 请求订单
      this.$ajax
        .post('/api/pay')
        .then((response) => {
          const token = response.data.item.token;
          // eslint-disable-next-line
          console.log(token);
          window.location.href = 'https://cndwine_pay/abcpay%7C' + token + '*https://cndwine-mall.winhm.com/mall/index';
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
