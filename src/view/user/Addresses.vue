<template>
  <div>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :add-button-text="addButtonText"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
  </div>
</template>

<script>
import {
  AddressList,
  Toast,
} from 'vant';

export default {
  components: {
    [AddressList.name]: AddressList,
  },
  data() {
    return {
      chosenAddressId: 0,
      list: [],
      addButtonText: '',
    };
  },
  created() {
    // eslint-disable-next-line
    this.addButtonText = this.$route.params.action === 'choose' ? '返回' : '',
    this.$ajax
      .get('/api/addresses')
      .then((response) => {
        // eslint-disable-next-line
        console.log(response.data.items);
        this.list = response.data.items.map(item => ({
          id: item.id,
          name: item.name,
          tel: item.cellphone ? item.cellphone : '',
          address: item.province + item.city + item.county + ' ' + item.address,
          is_default: item.is_default,
        }));
        this.list.forEach((value) => {
          if (Number(value.is_default) === 1) {
            this.chosenAddressId = value.id;
          }
          return true;
        });
      });
    return false;
  },

  methods: {
    onAdd() {
      Toast('新增地址');
      this.$router.push({ path: '/addresses/add' });
      if (this.$route.params.action === 'choose') {
        this.$router.go(-1);
      } else {
        this.$router.push({ path: '/addresses/add' });
      }
    },

    onEdit(item, index) {
      Toast('编辑地址:' + index);
      this.$router.push({ path: `/addresses/${item.id}/edit` });
    },

    onSelect(item) {
      // eslint-disable-next-line
      console.log(item);
      Toast('切换地址');
      const params = {
        is_default: 1,
      };
      this.$ajax
        .put('/api/addresses/' + item.id, params)
        .then((response) => {
          // eslint-disable-next-line
          console.log(response);
          if (response.data.code !== 200) {
            Toast.fail('设置默认地址失败');
          } else {
            Toast.success('设置默认地址成功');
            this.$router.go(-1);
          }
        }).catch((error) => {
          // 由网络或者服务器抛出的错误
          Toast(error.toString());
        });
    },
  },
};
</script>

<style lang="less">

</style>
