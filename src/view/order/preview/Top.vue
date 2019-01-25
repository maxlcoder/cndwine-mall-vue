<template>
	<van-cell-group>
		<van-cell
      icon="location"
      is-link
      :title="address.contact_name + '  ' + address.contact_cellphone"
      :label="address.address"
      to="/addresses/choose" />
	</van-cell-group>
</template>

<script>
import { Checkbox, Cell, CellGroup, Toast } from 'vant';

export default {
  name: 'top-address',
  components: {
    [Checkbox.name]: Checkbox,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast,
  },
  data() {
    return {
      address: {
        contact_name: '您还没有选择地址，请点击选择 ->',
        contact_cellphone: '',
        address: '',
      },
    };
  },
  created() {
    this.initAddress();
  },
  methods: {
    initAddress() {
      this.$ajax
        .get('/api/addresses/default')
        .then((response) => {
          // eslint-disable-next-line
          console.log(response);
          const address = response.data.item;
          if (!Object.is(address, null)) {
            this.address = {
              id: address.id,
              contact_name: address.name,
              contact_cellphone: address.cellphone,
              address: address.province + address.city + address.county + ' ' + address.address,
            };
            this.$emit('pushAddress', this.address.id);
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
.daodian {
  .van-checkbox .van-icon-success {
    height: 16px;
    width: 16px;
    &::before {
      line-height: 16px;
    }
  }
  .van-checkbox__input {
    height: 16px;
  }
  .van-checkbox__label {
    margin-left: 0;
  }
  .shop_address {
    padding-left: 25px;
    box-sizing: border-box;
  }
}
</style>
