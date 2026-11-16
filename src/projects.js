export const github = 'https://github.com/lyktql666'
export const media = (name) => `${import.meta.env.BASE_URL}media/${name}`

export const projects = [
  {
    id: 'mall',
    category: '电商 · 全栈开发',
    title: '母婴商城系统',
    description: '一套包含 uni-app 用户端和 Web 管理后台的商城。用户端覆盖商品浏览、购物车和订单，后台支持商品分类、订单处理及客户分析。',
    tags: ['Vue 3', 'uni-app', 'Express', 'MySQL'],
    repo: 'vue_xm',
    images: [
      { file: 'mall-admin.webp', label: '管理端仪表盘' },
      { file: 'mall-mobile.webp', label: '移动端商城首页' },
    ],
    video: 'mall-demo.mp4',
  },
  {
    id: 'factory',
    category: '工业 · 三维可视化',
    title: '智慧工厂数字孪生',
    description: '搭建三维产线和设备监控面板。模拟设备故障、停线和检修恢复，并在场景中定位设备、查看运行状态。',
    tags: ['Three.js', 'JavaScript', 'HTML / CSS'],
    repo: 'smart-factory',
    images: [{ file: 'factory.webp', label: '智慧工厂产线与设备监控面板' }],
    video: 'factory-demo.mp4',
  },
  {
    id: 'solar',
    category: '天文 · 三维交互',
    title: '太阳系 3D 模拟器',
    description: '在三维场景中观察太阳与八大行星的自转和公转。支持点击行星聚焦跟随，以及暂停、播放和调整模拟速度。',
    tags: ['Three.js', 'JavaScript', 'OrbitControls'],
    repo: 'solar-system',
    images: [{ file: 'solar.webp', label: '太阳、行星轨道与时间控制面板' }],
    video: 'solar-demo.mp4',
  },
]
