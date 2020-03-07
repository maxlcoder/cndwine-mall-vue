<template>
  <div class="goods">
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="picture in goods.swipes" :key="picture">
        <img :src="picture" >
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goods.title }}</div>
        <div class="goods-price">{{ '¥' + goods.price }}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="10">运费：{{ goods.express }}</van-col>
        <van-col span="14">剩余：{{ goods.stock }}</van-col>
      </van-cell>
    </van-cell-group>
    <!--
    <van-cell-group class="goods-cell-group">
      <van-cell value="进入店铺" icon="shop" is-link @click="sorry">
        <template slot="title">
          <span class="van-cell-text">有赞的店</span>
          <van-tag class="goods-tag" type="danger">官方</van-tag>
        </template>
      </van-cell>
      <van-cell title="线下门店" icon="location" is-link @click="sorry" />
    </van-cell-group>
    -->

    <van-collapse v-model="activeNames">
      <van-collapse-item title="简介" name="1">
        {{ goods.description }}
      </van-collapse-item>
      <van-collapse-item title="详情" name="2">
        <div v-for="(picture, i) in goods.pictures" :key="i">
          <img :src="picture"/>
        </div>
      </van-collapse-item>
    </van-collapse>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" @click="sorry" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="toCart" />
      <van-goods-action-button type="warning" text="加入购物车" @click="toAddCart" />
      <van-goods-action-button type="danger" text="立即购买" @click="toBuy" />
    </van-goods-action>
    <van-sku
      v-model="showBase"
      :sku="sku"
      :goods="goods"
      :goods-id="goods.id"
      :hide-stock="sku.hide_stock"
      :quota="quota"
      :quota-used="0"
      :reset-stepper-on-hide="true"
      :reset-selected-sku-on-hide="true"
      :close-on-click-overlay="false"
      :disable-stepper-input="false"
      :message-config="messageConfig"
      :initial-sku="initialSku"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
  </div>
</template>

<script>
import {
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Collapse,
  CollapseItem,
  Sku,
} from 'vant';

export default {
  components: {
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Sku.name]: Sku,
  },

  data() {
    return {
      activeNames: ['1', '2'],
      goods: {
        express: 0,
      },
      showBase: false,
      messageConfig: {},
      initialSku: {},
      sku: {
        tree: [
          {
            k: '规格',
            v: [
              {
                id: '30349',
                name: '天蓝色',
                imgUrl: 'https://img.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg',
              },
            ],
            k_s: 's1',
          },
        ],
        list: [],
        price: 1,
        stock_num: 999,
        collection_id: 0,
        collection_price: 0,
        none_sku: false,
        sold_num: 0,
        min_price: 1,
        max_price: 1,
        messages: [
          {
            datetime: '0',
            disable_multiple: false,
            disable: false,
            multiple: '0',
            name: '留言',
            disable_required: false,
            disable_edit_name: false,
            type: 'text',
            disable_delete: false,
            disable_type: false,
            required: '0',
          },
        ],
        hide_stock: false,
      },
      goods_id: 0,
      alias: '2oml0r0n5vytj',
      quota: 15,
      is_virtual: '0',
      quota_used: 0,
    };
  },

  created() {
    this.initGoods();
  },

  methods: {
    initGoods() {
      // eslint-disable-next-line
      console.log(this.$route.params);
      const goodsId = this.$route.params.id;
      // 加载商品
      this.$ajax
        .get(`/api/products/${goodsId}`)
        .then((response) => {
          // eslint-disable-next-line
          console.log(response.data.item);
          this.goods = {
            id: response.data.item.id,
            title: response.data.item.title,
            description: response.data.item.description,
            cover: response.data.item.cover,
            picture: response.data.item.cover,
            price: response.data.item.price,
            stock: response.data.item.stock,
            pictures: response.data.item.pictures,
            swipes: [response.data.item.cover],
          };
          this.sku.price = response.data.item.price;
          this.sku.tree[0].v = response.data.item.skus.map(sku => ({
            id: `${sku.id}`,
            name: sku.title,
            imgUrl: response.data.item.cover,
          }));
          this.sku.list = response.data.item.skus.map(sku => ({
            id: `${sku.id}`, // skuId，下单时后端需要
            price: sku.price * 100, // 价格（单位分）
            s1: `${sku.id}`, // 规格类目 k_s 为 s1 的对应规格值 id
            stock_num: sku.stock, // 当前 sku 组合对应的库存
          }));
          this.initialSku = this.sku.list[0]
        });
    },
    toCart() {
      this.$router.push('/cart');
    },
    toAddCart() {
      this.showBase = true;
    },
    toBuy() {
      this.showBase = true;
    },
    onAddCartClicked(content) {
      // eslint-disable-next-line
      console.log(content);
      const params = {
        product_id: content.goodsId,
        sku_id: content.selectedSkuComb.id,
        num: content.selectedNum,
      };
      this.$ajax
        .post('/api/carts/products', params)
        .then((response) => {
          if (response.data.code === 200) {
            this.$toast('添加购物车成功');
          } else {
            this.$toast('添加购物车失败');
          }
        });
    },

    onBuyClicked(data) {
      // eslint-disable-next-line
      console.log(data);
      const params = {
        id: this.goods.id,
        sku_id: data.selectedSkuComb.id,
        title: this.goods.title,
        cover: this.goods.cover,
        num: data.selectedNum,
        price: data.selectedSkuComb.price * 0.01,
      };
      const submitGoods = [];
      submitGoods.push(params);
      // eslint-disable-next-line
      console.log(submitGoods);
      this.$router.push(
        {
          path: '/order/preview',
          query: { goods: JSON.stringify(submitGoods) },
        });
    },
    sorry() {
      Toast('对不起，此功能还在开发中...');
    },
  },
};
</script>

<style lang="less">
.goods {
  padding-bottom: 50px;

  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }

  &-title {
    font-size: 16px;
  }

  &-price {
    color: #f44;
  }

  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }

  &-cell-group {
    margin: 15px 0;

    .van-cell__value {
      color: #999;
    }
  }

  &-tag {
    margin-left: 5px;
  }
}
.van-collapse-item {
  &__content {
    div {
      img {
        width: 100%;
      }
    }
  }
}
.van-goods-action {
  margin-bottom: 50px;
}
</style>
