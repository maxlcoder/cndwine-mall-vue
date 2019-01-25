<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      show-delete
      show-set-default
      :addressInfo="addressInfo"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import {
  AddressEdit,
  Toast,
} from 'vant';
import areaList from './area.json';

export default {
  components: {
    [AddressEdit.name]: AddressEdit,
  },
  data() {
    return {
      areaList,
      addressInfo: {},
      searchResult: [],
    };
  },
  created() {
    Toast.setDefaultOptions({ duration: 500 });
    this.initAddressInfo();
  },

  methods: {
    initAddressInfo() {
      this.$ajax
        .get('/api/addresses/' + this.$route.params.id)
        .then((response) => {
          // eslint-disable-next-line
          console.log(response.data.item);
          this.addressInfo = {
            id: response.data.item.id,
            name: response.data.item.name,
            tel: response.data.item.cellphone,
            province: response.data.item.province,
            city: response.data.item.city,
            county: response.data.item.county,
            addressDetail: response.data.item.address,
            areaCode: response.data.item.area_code,
            postalCode: '',
            isDefault: response.data.item.is_default === 1,
          };
        });
      return false;
    },
    onSave(content) {
      // TODO 调用api同步到后端
      // eslint-disable-next-line
      console.log(content.city);
      const params = {
        name: content.name,
        cellphone: content.tel,
        province: content.province,
        city: content.city,
        county: content.county,
        address: content.addressDetail,
        area_code: content.areaCode,
        is_default: Number(content.isDefault),
      };
      this.$ajax
        .put('/api/addresses/' + this.$route.params.id, params)
        .then((response) => {
          // eslint-disable-next-line
          console.log(response);
          if (response.data.code !== 200) {
            Toast.fail('添加地址失败');
          } else {
            Toast.success('添加地址成功');
            this.$router.go(-1);
          }
        }).catch((error) => {
          // 由网络或者服务器抛出的错误
          Toast(error.toString());
        });
    },
    onDelete() {
      this.$ajax
        .delete('/api/addresses/' + this.$route.params.id)
        .then((response) => {
          // eslint-disable-next-line
          console.log(response);
          if (response.data.code !== 200) {
            Toast.fail('删除地址失败');
          } else {
            Toast.success('删除地址成功');
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
