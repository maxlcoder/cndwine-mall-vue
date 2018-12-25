import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/view/Index';
import OrderIndex from '@/view/order/Index';
import OrderShow from '@/view/order/show/Index';
import GoodIndex from '@/view/goods/Index';
import UserIndex from '@/view/user/Index';
import CartIndex from '@/view/cart/Index';
import AddressIndex from '@/view/user/Addresses';
import AddressEdit from '@/view/user/AddressEdit';
import AddressAdd from '@/view/user/AddressAdd';
import OrderPreview from '@/view/order/preview/Index';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/order/preview',
      name: 'OrderPreview',
      component: OrderPreview,
    },
    {
      path: '/',
      redirect: '/mall/index',
    },
    {
      path: '/orders',
      name: 'OrderIndex',
      component: OrderIndex,
    },
    {
      path: '/orders/:id',
      name: 'OrderShow',
      component: OrderShow,
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
      path: '/addresses/add',
      name: 'AddressAdd',
      component: AddressAdd,
    },
    {
      path: '/addresses/:id/edit',
      name: 'AddressEdit',
      component: AddressEdit,
    },
    {
      path: '/addresses/:action',
      name: 'AddressChoose',
      component: AddressIndex,
    },
    {
      path: '/cart',
      name: 'CartIndex',
      component: CartIndex,
    },
    {
      path: '/mall/index',
      name: 'Index',
      component: Index,
    },
    {
      path: '/mall/index/:id',
      redirect: '/orders/:id',
    },
  ],
});
