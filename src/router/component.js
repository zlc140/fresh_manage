export const Login = r => require.ensure([],() => r(require('../components/login')),'group-login');
// 商品管理
export const proList = r => require.ensure([],() => r(require('../view/product/pro_list')),'group-product');
export const classList = r => require.ensure([],() => r(require('../view/product/class_list')),'group-product');
export const brand = r => require.ensure([],() => r(require('../view/product/brand')),'group-product');
export const proAdd = r => require.ensure([],() => r(require('../view/product/add')),'group-product');
export const review = r => require.ensure([],() => r(require('../view/product/review')),'group-product');

// 用户管理
export const userList = r => require.ensure([],() => r(require('../view/frontUser/list')),'group-frontUser');
export const newuser = r => require.ensure([],() => r(require('../view/frontUser/new_user')),'group-frontUser');
export const reply = r => require.ensure([],() => r(require('../view/frontUser/reply')),'group-frontUser');
export const feedback = r => require.ensure([],() => r(require('../view/frontUser/feedback')),'group-frontUser');
 
// 订单管理
export const orderList = r => require.ensure([],() => r(require('../view/order/list')),'group-order');
export const advorder = r => require.ensure([],() => r(require('../view/order/adv_order')),'group-order');
export const bill = r => require.ensure([],() => r(require('../view/order/bill')),'group-order');
export const orderDetail = r => require.ensure([],() => r(require('../view/order/orderDetail')),'group-order');
 

// 库存管理
export const kucunList = r => require.ensure([],() => r(require('../view/kucun/list')),'group-kucun');
export const kucunDetail = r => require.ensure([],() => r(require('../view/kucun/detail')),'group-kucun');
export const returnPro = r => require.ensure([],() => r(require('../view/kucun/return')),'group-kucun');
export const sendPro = r => require.ensure([],() => r(require('../view/kucun/send')),'group-kucun');

// 内容管理
export const essayClass = r => require.ensure([],() => r(require('../view/content/essay_class')),'group-content');
export const essayManage = r => require.ensure([],() => r(require('../view/content/essay_manage')),'group-content');
export const floor = r => require.ensure([],() => r(require('../view/content/floor')),'group-content');
export const  banner = r => require.ensure([],() => r(require('../view/content/banner')),'group-content');
export const nav = r => require.ensure([],() => r(require('../view/content/nav')),'group-content');

// 系统管理管理
export const transport = r => require.ensure([],() => r(require('../view/manageUser/transport')),'group-manageUser');
export const manageList = r => require.ensure([],() => r(require('../view/manageUser/user_list')),'group-manageUser');

// 统计报表
export const baobiao = r => require.ensure([],() => r(require('../view/baobiao')),'group-baobiao');
