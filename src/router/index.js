import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import OrderIndex from '@/components/order/Index';
import GoodIndex from '@/components/goods/Index';
import UserIndex from '@/components/user/Index';
import CartIndex from '@/components/cart/Index';
import AddressIndex from '@/components/user/Addresses';
import AddressEdit from '@/components/user/AddressEdit';
import AddressAdd from '@/components/user/AddressAdd';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/orders',
      name: 'OrderIndex',
      component: OrderIndex,
    },
    {
      path: '/goods/:id',
      name: 'GoodIndex',
      component: GoodIndex,
    },
    {
      path: '/user',
      name: 'UserIndex',
      component: UserIndex,
    },
    {
      path: '/addresses',
      name: 'AddressIndex',
      component: AddressIndex,
    },
    {
      path: '/addresses/:id/edit',
      name: 'AddressEdit',
      component: AddressEdit,
    },
    {
      path: '/addresses/add',
      name: 'AddressAdd',
      component: AddressAdd,
    },
    {
      path: '/cart',
      name: 'CartIndex',
      component: CartIndex,
    },
  ],
});
