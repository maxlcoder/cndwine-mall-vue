<template>
  <div>
    <van-checkbox-group class="card-goods" v-model="checkedGoods">
      <van-checkbox
        class="card-goods__item"
        v-for="item in goods"
        :key="item.sku_id"
        :name="item.sku_id"
        :label-disabled="true"
      >
        <van-card
          :title="item.title"
          :desc="item.desc"
          :price="item.price"
          :thumb="item.cover">
          <div slot="footer" v-if="isEditor">
            <van-stepper v-model="item.num"/>
            <van-button
              class="delete"
              type="danger"
              size="small"
              @click="onDelete(item.cart_id)">
              删除
            </van-button>
					</div>
        </van-card>
      </van-checkbox>
    </van-checkbox-group>
    <van-submit-bar
      :price="totalPrice"
      :disabled="!checkedGoods.length"
      :button-text="submitBarText"
      @submit="onSubmit">
      <van-checkbox v-model="checkedAll" @change="setCheckAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast, Stepper, Button } from 'vant';

export default {
  components: {
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup,
    [Stepper.name]: Stepper,
    [Button.name]: Button,
  },

  data() {
    return {
      checkedGoods: [],
      checkedAll: true,
      goods: [],
      isEditor: true,
    };
  },

  created() {
    Toast.setDefaultOptions({ duration: 500 });
    this.initCart();
  },

  computed: {
    submitBarText() {
      const count = this.checkedGoods.length;
      return '结算' + (count ? `(${count})` : '');
    },

    totalPrice() {
      return this.goods.reduce(
        (total, item) => total +
        (this.checkedGoods.indexOf(item.sku_id) !== -1 ? item.price * item.num * 100 : 0), 0);
    },
  },

  methods: {
    initCart() {
      // eslint-disable-next-line
      console.log('购物车初始化');
      // 请求订单
      this.$ajax
        .get('/api/carts/products')
        .then((response) => {
          // eslint-disable-next-line
          console.log(response.data.items);
          this.goods = this.assembleCarts(response.data.items);
          this.checkedGoods = this.assembleCheckedGoods(response.data.items);
          // eslint-disable-next-line
          console.log(this.checkedGoods);
        });
    },
    setCheckAll(val) {
      // eslint-disable-next-line
      console.log(val);
      this.checkedGoods = val
        ? this.goods.filter(goods => !!goods.num).map(goods => goods.sku_id)
        : [];
      // eslint-disable-next-line
      console.log(this.goods);
    },
    assembleCarts(items) {
      return items.map(item => ({
        cart_id: item.cart_id,
        id: item.id,
        sku_id: item.sku_id,
        title: item.title,
        num: item.num,
        price: item.price,
        cover: item.cover,
      }));
    },
    assembleCheckedGoods(items) {
      return items.map(item => item.sku_id);
    },
    onSubmit() {
      Toast('点击结算');
      let submitGoods = [];
      submitGoods = this.goods.filter(goods => this.checkedGoods.includes(goods.sku_id))
        .map(goods => ({
          id: goods.id,
          sku_id: goods.sku_id,
          title: goods.title,
          cover: goods.cover,
          num: goods.num,
          price: goods.price,
        }));
      // eslint-disable-next-line
      console.log('submitGoods');
      // eslint-disable-next-line
      console.log(submitGoods);
      this.$router.push(
        {
          path: '/order/preview',
          query: { goods: JSON.stringify(submitGoods) },
        });
    },
    onDelete(index) {
      // eslint-disable-next-line
      console.log(index);
      // eslint-disable-next-line
      console.log(this.goods);
      // 请求订单
      this.$ajax
        .delete(`/api/carts/${index}`)
        .then((response) => {
          // eslint-disable-next-line
          console.log(response.data);
          Toast('删除');
          this.goods = this.goods.filter(item => item.cart_id !== index);
          this.checkedGoods = this.assembleCheckedGoods(this.goods);
        });
    },
  },
};
</script>

<style lang="less">
.card-goods {
  padding: 10px 0;
  background-color: #fff;

  &__item {
    position: relative;
    background-color: #fafafa;

    .van-checkbox__label {
      width: 100%;
      padding: 0 10px 0 15px;
      box-sizing: border-box;
    }

    .van-checkbox__icon {
      top: 50%;
      left: 10px;
      z-index: 1;
      position: absolute;
      margin-top: -10px;
    }

    .van-card__price {
      color: #f44;
    }
    .delete {
      float: right;
      margin-top: 5px;
    }
  }
}
.van-submit-bar {
  &__bar {
    .van-checkbox {
      margin-left: 10px;
    }
  }
}
</style>
