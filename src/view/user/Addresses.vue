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
    Toast.setDefaultOptions({ duration: 500 });
    this.$ajax
      .get('/api/addresses')
      .then((response) => {
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
      this.$router.push({ path: '/addresses/add' });
    },

    onEdit(item) {
      this.$router.push({ path: `/addresses/${item.id}/edit` });
    },

    onSelect(item) {
      const params = {
        is_default: 1,
      };
      this.$ajax
        .put('/api/addresses/' + item.id, params)
        .then((response) => {
          if (response.data.code !== 200) {
            Toast.fail('设置默认地址失败');
          } else if (this.$route.params.action === 'choose') {
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
