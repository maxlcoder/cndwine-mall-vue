<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      show-set-default
      @save="onSave"
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
    [Toast.name]: Toast,
  },
  data() {
    return {
      areaList,
      searchResult: [],
    };
  },
  created() {
    Toast.setDefaultOptions({ duration: 500 });
  },
  methods: {
    onSave(content) {
      // TODO 调用api同步到后端
      // eslint-disable-next-line
      console.log(content);
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
        .post('/api/addresses', params)
        .then((response) => {
          // eslint-disable-next-line
          console.log(response);
          if (response.data.code !== 200) {
            Toast.fail('添加地址失败');
          } else {
            Toast.success('添加地址成功');
            this.$router.push({ path: '/addresses' });
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
