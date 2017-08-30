export const Login = r => require.ensure([],() => r(require('../components/login')),'group-login');

// 商品管理
export const proList = r => require.ensure([],() => r(require('../view/product/pro_list')),'group-product');
export const classList = r => require.ensure([],() => r(require('../view/product/class_list')),'group-product');
export const brand = r => require.ensure([],() => r(require('../view/product/brand')),'group-product');
export const proAdd = r => require.ensure([],() => r(require('../view/product/add')),'group-product');
export const review = r => require.ensure([],() => r(require('../view/product/review')),'group-product');
export const kucunList = r => require.ensure([],() => r(require('../view/product/kucun')),'group-product');

// 店铺
export const storeList = r => require.ensure([],() => r(require('../view/stores/index')),'group-store');

// 用户管理
export const userList = r => require.ensure([],() => r(require('../view/frontUser/list')),'group-frontUser');
export const newuser = r => require.ensure([],() => r(require('../view/frontUser/new_user')),'group-frontUser');
export const role = r => require.ensure([],() => r(require('../view/frontUser/role')),'group-frontUser');
 
// 订单管理
export const orderList = r => require.ensure([],() => r(require('../view/order/list')),'group-order');
export const advorder = r => require.ensure([],() => r(require('../view/order/adv_order')),'group-order');

// 账单管理
export const bill = r => require.ensure([],() => r(require('../view/bill')),'group-order');

// 审核
export const checkBrand = r => require.ensure([],() => r(require('../view/check/ckBrand')),'group-check');
export const checkPro = r => require.ensure([],() => r(require('../view/check/ckPro')),'group-check');
export const checkUser = r => require.ensure([],() => r(require('../view/check/ckUser')),'group-check');
export const checkStore = r => require.ensure([],() => r(require('../view/check/ckStore')),'group-check');
export const checkCoupon = r => require.ensure([],() => r(require('../view/check/ckCoupon')),'group-check');

// 首页管理
export const floor = r => require.ensure([],() => r(require('../view/content/floor')),'group-content');
export const  banner = r => require.ensure([],() => r(require('../view/content/banner')),'group-content');

// 优惠券couponList
export const couponList = r => require.ensure([],() => r(require('../view/coupon/list')),'group-coupon');
export const history = r => require.ensure([],() => r(require('../view/coupon/history')),'group-coupon');
// 系统管理
export const manageList = r => require.ensure([],() => r(require('../view/manage/manage')),'group-manage');
// 财务管理
export const finance = r => require.ensure([],() => r(require('../view/finance')),'group-finance');
// 统计报表
export const baobiao = r => require.ensure([],() => r(require('../view/baobiao')),'group-baobiao');


