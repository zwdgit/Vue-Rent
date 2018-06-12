const home = resolve => require(['@/page/home/home'], resolve)
const User = resolve => require(['@/page/user/index'], resolve)
const Login = resolve => require(['@/page/user/login'], resolve)
const Power = resolve => require(['@/page/user/power'], resolve)
const Register = resolve => require(['@/page/user/register'], resolve)
const Publish = resolve => require(['@/page/publish/index'], resolve)
const Atlas = resolve => require(['@/page/exhibition/atlas'], resolve)
const More = resolve => require(['@/page/more/index'], resolve)
const keyWord = resolve => require(['@/page/user/keyword'], resolve)
const BlackList = resolve => require(['@/page/user/blacklist'], resolve)
const ModifyData = resolve => require(['@/page/user/modifydata'], resolve)
const CellPhone = resolve => require(['@/page/user/cellphone'], resolve)
const Follow = resolve => require(['@/page/user/follow'], resolve)
const HomeIndex = resolve => require(['@/page/index'], resolve)
const Issue = resolve => require(['@/page/user/issue'], resolve)
const DiscUss = resolve => require(['@/page/user/discuss'], resolve)
const DiscoVer = resolve => require(['@/page/more/discover'], resolve)
const MoreLaBel = resolve => require(['@/page/more/label'], resolve)
const InforMation = resolve => require(['@/page/more/information'], resolve)
const RanKing = resolve => require(['@/page/more/ranking'], resolve)
const OthErs = resolve => require(['@/page/others/index'], resolve)
const exhibition = resolve => require(['@/page/exhibition/home'], resolve)
const Topic = resolve => require(['@/page/exhibition/topic'], resolve)
const DetaIls = resolve => require(['@/page/home/details'], resolve)

export default [
  {
    path: '/',
    redirect: {path: '/home'},
    component: home,
  },
  {
    path: '/index',
    name: '首页四栏',
    component: HomeIndex,
    children: [
      {path: '/home', name: '主页', component: home},
      {path: '/exhibition', name: '展集', component: exhibition},
      {path: '/more', name: '更多', component: More},
      {path: '/user', name: '个人中心', component: User},
    ]
  },
  {path: '/login', name: '登录', component: Login,},
  {path: '/register', name: '注册', component: Register,},
  {path: '/user/power', name: '发布权限', component: Power},
  {path: '/user/keyword', name: '关键词过滤', component: keyWord},
  {path: '/user/blacklist', name: '黑名单', component: BlackList},
  {path: '/user/modifydata', name: '修改资料', component: ModifyData},
  {path: '/user/cellphone', name: '手机绑定', component: CellPhone},
  {path: '/user/follow', name: '关注的人', component: Follow},
  {path: '/publish', name: '发布', component: Publish},
  {path: '/user/issue', name: '我相关的', component: Issue},
  {path: '/user/discuss', name: '我的评论', component: DiscUss},
  {path: '/more/discover', name: '发现', component: DiscoVer},
  {path: '/more/information', name: '收到的评论', component: InforMation},
  {path: '/more/label', name: '分类及标签', component: MoreLaBel},
  {path: '/more/ranking', name: '数据排行榜', component: RanKing},
  {path: '/exhibition/atlas', name: '图集', component: Atlas},
  {path: '/exhibition/topic', name: '本周话题', component: Topic},
  {path: '/details', name: '详情页', component: DetaIls}
]
