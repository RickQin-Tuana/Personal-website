export interface Work {
  id: number
  title: string
  type: string
  description: string
  cover: string
  date?: string
}

export interface Skill {
  id: number
  icon: string
  title: string
  description: string
}

export const worksData: Work[] = [
  {
    id: 1,
    title: '企业安全体系建设',
    type: '网络安全',
    description: '为大型金融机构构建完整的网络安全防护体系，包括防火墙部署、入侵检测系统和安全审计系统。',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cybersecurity%20network%20protection%20dark%20theme%20technology%20abstract&image_size=landscape_16_9',
    date: '2024.11'
  },
  {
    id: 2,
    title: '业务系统开发',
    type: '全栈开发',
    description: '为企业定制开发高性能业务管理系统，覆盖流程审批、数据可视化与权限控制等核心模块。',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=business%20system%20development%20dashboard%20dark%20theme%20modern%20UI%20data%20visualization&image_size=landscape_16_9',
    date: '2024.6'
  },
  {
    id: 3,
    title: '全链路建网',
    type: '网站建设',
    description: '从架构设计到部署运维，构建高可用、可扩展的全链路网络基础设施与网站服务体系。',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=full%20link%20network%20construction%20topology%20dark%20theme%20technology%20infrastructure&image_size=landscape_16_9',
    date: '2025.2'
  },
  {
    id: 4,
    title: '漏洞挖掘渗透测试',
    type: '安全服务',
    description: '提供专业的漏洞挖掘与渗透测试服务，帮助企业发现潜在风险并给出修复方案。',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=penetration%20testing%20vulnerability%20mining%20cybersecurity%20dark%20theme%20hacker%20terminal&image_size=landscape_16_9',
    date: '2025.9'
  },
  {
    id: 5,
    title: 'Tuana-LRY',
    type: 'girlfriend',
    description: '浪漫至死不渝，我爱你李柔雨',
    cover: '/images/work-tuan-lry.jpg',
    date: '2024.10.23'
  }
]

export const skillsData: Skill[] = [
  {
    id: 1,
    icon: 'Shield',
    title: '网络安全',
    description: '精通渗透测试、安全审计、漏洞分析，为企业提供全面的安全解决方案。'
  },
  {
    id: 2,
    icon: 'Laptop',
    title: '全栈开发',
    description: '熟练掌握 Vue、React、Node.js、PHP 等技术栈，独立完成大型项目开发。'
  },
  {
    id: 3,
    icon: 'RefreshCcw',
    title: '全链交付',
    description: '具备全栈测试思维，覆盖功能、性能与自动化，构建从需求到上线的质量闭环，保障数字产品稳定可靠。'
  },
  {
    id: 4,
    icon: 'Bot',
    title: 'AI技术应用',
    description: '将 AI 编程助手与全栈框架深度结合，从代码生成、测试用例到部署监控全链路提效，以 Vibe Coding 方式实现快速原型与高质量交付。'
  },
  {
    id: 5,
    icon: 'Cloud',
    title: '云原生架构',
    description: '精通 Docker、Kubernetes，实现应用的容器化部署和自动化运维。'
  }
]

export const personalInfo = {
  name: 'RickQin',
  greeting: 'Hi, I am RickQin!',
  title: 'vibe coding全栈工程师/网络安全工程师',
  bio: '用 AI 赋能编程，贯通网络安全与全栈开发。\n我不只写代码，更擅长从 0 到 1 定义系统边界，让每一行代码都有安全考量，每一次部署都经得起自动化检验。',
  identity: 'vibe coding全栈工程师/网络安全工程师',
  direction: '开发/网安/渗透',
  phone: '153****7708',
  email: '3075810785@qq.com',
  stats: [
    { label: '项目落地', value: '8+' },
    { label: '参与项目', value: '30+' },
    { label: '能力积累', value: '500+' }
  ],
  buildingTags: ['vibe coding', '网站建设', '系统开发', 'web渗透', '安全建设'],
  avatar: '/images/avatar-cat.png'
}

export interface Experience {
  id: number
  period: string
  company: string
  role: string
  tags: string[]
  description: string
}

export const experienceData: Experience[] = [
  {
    id: 1,
    period: '2024.11 - 2025.06',
    company: '奇安信成都某代理科技公司',
    role: '安全服务工程师',
    tags: ['安全建设', '漏洞排查', '代码审计'],
    description: '负责客户系统安全建设、漏洞排查、代码审计\n参与国家、省、市级护网行动，进行研判溯源等蓝队工作'
  },
  {
    id: 2,
    period: '2025.06 - 2025.12',
    company: '亚信成都某代理公司',
    role: '售前工程师',
    tags: ['售前支持', '产品选型', '技术验证'],
    description: '统筹协调售前工作，为客户提供技术支持\n负责产品选型、技术验证及中标项目的落地应用'
  },
  {
    id: 3,
    period: '2025.12 - 至今',
    company: '西南FOFA服务中心',
    role: '技术负责人',
    tags: ['FOFA', '技术支持', '团队管理'],
    description: '负责FOFA产品的技术支持，统筹团队工作\n提供技术支持解决难点问题，覆盖安全服务、产品赋能及项目从建设到落地的全流程工作'
  }
]
