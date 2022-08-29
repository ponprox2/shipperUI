// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Đăng Ký Khu Vực Giao Hàng',
    path: '/dashboard/app',
    // icon: '',
  },
  {
    title: 'Danh Sách Đơn Hàng Vận Chuyển',
    path: '/dashboard/products',
    // icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Nhận - Hủy Đơn Vận Chuyển',
    path: '/dashboard/user',
    // icon: getIcon('eva:people-fill'),
  },

  {
    title: 'Giao Hàng',
    path: '/dashboard/order',
    //  icon: getIcon('eva:alert-triangle-fill'),
  },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon('eva:file-text-fill'),
  // },
  {
    title: 'logout',
    path: '/login',
    //   icon: getIcon('eva:lock-fill'),
  },
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
