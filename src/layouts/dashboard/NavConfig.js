// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Đăng Ký Khu Vực Vận Chuyển',
    path: '/dashboard/shipperWork',
    // icon: '',
  },
  {
    title: 'Xác Nhận Đơn Lấy Hàng',
    path: '/dashboard/declinePickup',
  },
  {
    title: 'Lấy Hàng',
    path: '/dashboard/pickup',
  },
  // {
  //   title: 'Danh Sách Đơn Giao Hàng',
  //   path: '/dashboard/orders',
  //   // icon: getIcon('eva:shopping-bag-fill'),
  // },
  {
    title: 'Xác Nhận Đơn Giao Hàng',
    path: '/dashboard/deliveryConfirmation',
    // icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Giao Hàng',
    path: '/dashboard/shippingOrdersDelivering',
  },
  {
    title: 'Thu Hàng',
    path: '/dashboard/returnBack',
  },
  {
    title: 'Xác Nhận Đơn Trả Hàng',
    path: '/dashboard/returnConfirmation',
  },
  {
    title: 'Trả Hàng',
    path: '/dashboard/returningBack',
  },
  // {
  //   title: 'Hủy Đơn Giao Hàng',
  //   path: '/dashboard/declineDelevery',
  // },

  // {
  //   title: 'logout',
  //   path: '/login',
  //   //   icon: getIcon('eva:lock-fill'),
  // },
  // {
  //   title: 'register',
  //   path: '/dashboard/register',
  //   icon: getIcon('eva:person-add-fill'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;
