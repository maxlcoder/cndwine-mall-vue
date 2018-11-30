<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      show-search-result
      :search-result="searchResult"
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
      searchResult: [],
    };
  },

  methods: {
    onSave() {
      Toast('save');
      // TODO 调用api同步到后端
    },
    onDelete() {
      Toast('delete');
      // TODO 调用api同步到后端
    },
  },
};
</script>

<style lang="less">

</style>
