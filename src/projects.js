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
      { file: 'mall-admin-catalog.webp', label: '商品列表' },
      { file: 'mall-admin-categories.webp', label: '商品分类管理' },
      { file: 'mall-admin-inventory.webp', label: '库存批次明细' },
      { file: 'mall-admin-login.webp', label: '管理端登录' },
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
    images: [
      { file: 'factory.webp', label: '智慧工厂产线与设备监控面板' },
      { file: 'factory-layout.webp', label: '厂区俯视与工位布局' },
      { file: 'factory-inspection.webp', label: '视觉质检机定位' },
      { file: 'factory-alarm.webp', label: '故障告警与联动停线' },
      { file: 'factory-maintenance.webp', label: '设备检修倒计时' },
    ],
    video: 'factory-demo.mp4',
  },
  {
    id: 'solar',
    category: '天文 · 三维交互',
    title: '太阳系 3D 模拟器',
    description: '在三维场景中观察太阳与八大行星的自转和公转。支持点击行星聚焦跟随，以及暂停、播放和调整模拟速度。',
    tags: ['Three.js', 'JavaScript', 'OrbitControls'],
    repo: 'solar-system',
    images: [
      { file: 'solar.webp', label: '太阳、行星轨道与时间控制面板' },
      { file: 'solar-orbits.webp', label: '轨道俯视与倍速控制' },
      { file: 'solar-earth.webp', label: '地球特写与科普面板' },
      { file: 'solar-saturn.webp', label: '土星环与科普面板' },
      { file: 'solar-jupiter.webp', label: '木星云带与科普面板' },
    ],
    video: 'solar-demo.mp4',
  },
]
