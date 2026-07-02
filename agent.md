# 个人网站项目

## 项目概述

本项目是一个基于 **ThinkPHP 3.2** 后端与 **Vue 3 + Vite** 前端的个人作品集网站，采用前后端分离架构。网站包含首页展示、个人介绍、作品展示、技能展示、联系表单等功能模块，并配有丰富的 GSAP 滚动动画与 3D 吊牌（Lanyard）交互效果。后端提供 RESTful API 用于作品数据获取与联系表单数据持久化，数据存储在 SQLite 嵌入式数据库中。

## 主要功能

- **首页 Hero**：动态标题、个人简介、CTA 按钮
- **关于我 / 工作经历**：个人介绍、头像 3D 卡片交互、职业经历时间线
- **精选作品**：作品列表悬停预览、作品详情图片展示
- **技能优势**：技能卡片网格展示
- **联系我**：表单校验、后端数据库持久化、留言管理后台
- **Lanyard 3D 吊牌**：点击导航栏按钮展示可拖拽的 3D 吊牌模型

## 技术栈详情

### 后端技术架构

| 分类 | 技术 | 版本 | 说明 |
|------|------|------|------|
| 核心框架 | ThinkPHP | 3.2.x | PHP MVC 开发框架 |
| PHP 版本 | PHP | 7.3.4 NTS | 运行环境要求 |
| 数据库 | SQLite | 3.24.0 | 嵌入式关系型数据库，通过 PDO 访问 |
| 数据库驱动 | pdo_sqlite | PHP 内置扩展 | SQLite PDO 驱动 |
| API 规范 | RESTful API | - | 接口设计标准 |
| 数据交换格式 | JSON | - | 前后端数据传输格式 |

### 前端技术架构

| 分类 | 技术 | 版本 | 说明 |
|------|------|------|------|
| 核心框架 | Vue | 3.5.34 | 前端组件框架 |
| 编程语言 | TypeScript | 6.0.3 | 类型安全 |
| 构建工具 | Vite | 8.0.16 | 快速构建与开发服务器 |
| 路由管理 | Vue Router | 4.6.4 | 单页应用路由 |
| HTTP 客户端 | Axios | 1.18.0 | API 请求库 |
| 动画库 | GSAP | 3.15.0 | 滚动触发与页面动画 |
| 动画辅助 | motion-v | 2.3.0 | 交互动画 |
| 3D 渲染 | Three.js | 0.164.1 | WebGL 3D 渲染 |
| React 3D 生态 | @react-three/fiber / drei / rapier | 8.17.5 / 9.108.3 / 1.3.1 | Lanyard 吊牌 3D 场景 |
| 图标库 | lucide-vue-next | 0.577.0 | SVG 图标 |
| 工具库 | @vueuse/core | 14.3.0 | Vue 组合式工具 |
| CSS 方案 | Tailwind CSS | 4.3.1 | 原子化 CSS |
| Tailwind Vite 插件 | @tailwindcss/vite | 4.3.1 | Tailwind 与 Vite 集成 |

### 开发工具与环境

| 分类 | 工具 | 说明 |
|------|------|------|
| 包管理工具 | npm | JavaScript 包管理 |
| 版本控制系统 | Git | 代码版本管理 |
| 本地 PHP 环境 | phpStudy / PHP 内置服务器 | 提供 PHP 7.3.4 运行环境 |
| 热模块替换 | Vite HMR | 前端开发热更新 |
| 浏览器自动化 | Puppeteer Core | 25.2.1 | 用于构建/截图等自动化 |

## 项目结构

```
Personal website/
├── agent.md                              # 项目技术文档（本文件）
├── README.md                             # GitHub 项目说明文档
├── TECHNICAL_DOCUMENTATION.md            # 联系表单数据库集成技术文档
├── backend/                              # 后端代码目录
│   ├── Application/                      # 应用目录
│   │   ├── Common/                       # 公共模块
│   │   │   ├── Common/                   # 公共函数
│   │   │   └── Conf/                     # 公共配置（数据库配置）
│   │   ├── Home/                         # 前台模块
│   │   │   ├── Common/                   # 模块公共函数
│   │   │   ├── Conf/                     # 模块配置
│   │   │   ├── Controller/               # 控制器
│   │   │   │   ├── ApiController.class.php   # API 控制器（works / messages）
│   │   │   │   └── IndexController.class.php # 首页控制器
│   │   │   ├── Model/                    # 模型目录
│   │   │   ├── View/                     # 视图目录
│   │   │   └── index.html
│   │   ├── Runtime/                      # 运行时目录（缓存、日志、数据库）
│   │   │   ├── Cache/                    # 模板缓存
│   │   │   ├── Data/                     # 数据目录（contact_messages.sqlite）
│   │   │   ├── Logs/                     # 日志目录
│   │   │   └── Temp/                     # 临时文件
│   │   ├── README.md
│   │   └── index.html
│   ├── Public/                           # Web 入口目录
│   │   ├── index.php                     # ThinkPHP 入口文件
│   │   ├── admin_messages.php            # 留言管理查看页
│   │   └── test.php                      # 测试文件
│   ├── ThinkPHP/                         # ThinkPHP 框架核心
│   ├── .htaccess                         # URL 重写配置
│   └── README.md
├── frontend/                             # 前端代码目录
│   ├── src/
│   │   ├── components/                   # 页面组件
│   │   │   ├── HeroSection.vue           # 首页 Hero 区域
│   │   │   ├── AboutSection.vue          # 关于我 / 工作经历
│   │   │   ├── WorksSection.vue          # 精选作品
│   │   │   ├── SkillsSection.vue         # 技能优势
│   │   │   ├── ContactSection.vue        # 联系我表单
│   │   │   ├── NavBar.vue                # 顶部导航栏
│   │   │   ├── LampBg.vue                # 背景光效
│   │   │   ├── LanyardWrapper.vue        # 3D 吊牌包装组件
│   │   │   ├── CircularGallery.vue       # 圆形画廊组件
│   │   │   └── GlitchText.vue            # 故障文字效果
│   │   ├── composables/                  # 组合式函数
│   │   │   ├── useAnimationSystem.ts     # GSAP 动画系统
│   │   │   └── useReveal.ts              # 滚动显现动画
│   │   ├── data/
│   │   │   └── mock.ts                   # 本地 mock 数据
│   │   ├── router/
│   │   │   └── index.ts                  # Vue Router 配置
│   │   ├── utils/
│   │   │   └── lanyardStyles.ts          # Lanyard 动态样式
│   │   ├── api.ts                        # axios API 封装
│   │   ├── App.vue                       # 根组件
│   │   ├── main.ts                       # 入口文件
│   │   └── style.css                     # 全局样式
│   ├── public/                           # 静态资源目录
│   │   └── images/                       # 图片资源
│   │       ├── avatar-cat.png
│   │       ├── lanyard-front.png
│   │       ├── lanyard-back.png
│   │       └── work-tuan-lry.jpg
│   ├── index.html                        # HTML 模板
│   ├── vite.config.ts                    # Vite 配置（含代理）
│   ├── package.json                      # 依赖配置
│   ├── tsconfig.json                     # TypeScript 配置
│   └── tsconfig.node.json
└── .gitignore
```

## 可访问页面与功能说明

### 前端页面

| 页面 / 区域 | 功能描述 | 访问路径 | 访问方法 | 所需权限 |
|------------|---------|---------|---------|---------|
| 首页 | 网站主页面，集成所有内容区块 | `/` | 直接访问域名根路径 | 无 |
| Hero 首屏 | 个人品牌展示、动态标题、简介 | `/#hero` | 顶部导航 `RickQ` 品牌 / 页面加载默认区域 | 无 |
| 关于我 / 工作经历 | 个人介绍、头像 3D 卡片、职业经历时间线 | `/#about` | 顶部导航「工作经历」/ 直接输入锚点 | 无 |
| 精选作品 | 作品列表、悬停预览图 | `/#works` | 顶部导航「精选作品」/ 直接输入锚点 | 无 |
| 个人优势 | 技能卡片网格展示 | `/#skills` | 顶部导航「个人优势」/ 直接输入锚点 | 无 |
| 联系我 | 联系表单（姓名、邮箱、留言） | `/#contact` | 顶部导航「联系我」/ 直接输入锚点 | 无 |
| Lanyard 3D 吊牌 | 可交互的 3D 吊牌模型 | 弹窗覆盖层 | 点击顶部导航「Lanyard」按钮 | 无 |

### 后端 API 接口

| 接口 | 功能 | 访问路径 | 请求方法 | 说明 |
|------|------|---------|---------|------|
| 作品列表 | 返回精选作品数据 | `http://localhost:8080/Home/Api/works` | GET | 前端优先调用，失败则降级本地 mock |
| 提交留言 | 接收并持久化联系表单 | `http://localhost:8080/Home/Api/messages` | POST | 参数：`name`, `email`, `message` |
| 404 兜底 | 未匹配接口返回 JSON | `http://localhost:8080/Home/Api/*` | - | 返回 `code: 404` |

### 管理后台

| 页面 | 功能描述 | 访问路径 | 所需权限 | 说明 |
|------|---------|---------|---------|------|
| 留言管理页 | 查看所有已提交的联系表单 | `http://localhost:8080/admin_messages.php?token=rickqin2024` | URL token：`rickqin2024` | 分页展示，默认每页 20 条 |

## 快速开始

### 环境准备

1. **PHP 环境**：安装 PHP 7.3.4 及以上版本，推荐通过 phpStudy 安装；确保 `pdo_sqlite` 扩展已启用
2. **Node.js 环境**：安装 Node.js 18+ 及 npm
3. **Git**：用于代码版本管理（可选）

### 启动后端服务

方式一：使用 PHP 内置开发服务器（适合本地调试）：

```powershell
& "F:\phpstudy\phpstudy_pro\Extensions\php\php7.3.4nts\php.exe" `
  -S localhost:8080 `
  -t "f:\God'sChoice\Vibe Coding project\Personal website\backend\Public"
```

方式二：通过 phpStudy / Nginx / Apache 配置站点，将 Web 根目录指向 `backend/Public`。

后端服务默认在 http://localhost:8080 运行。

### 启动前端服务

```bash
cd frontend
npm install
npm run dev
```

前端服务默认在 http://localhost:5173 运行，Vite 会将 `/api` 代理到 `http://localhost:8080`。

### 生产构建

```bash
cd frontend
npm run build
```

构建产物输出到 `frontend/dist/` 目录。

## 服务端口说明

| 服务 | 地址 | 端口 | 说明 |
|------|------|------|------|
| ThinkPHP 后端 | http://localhost:8080 | 8080 | API 与入口 |
| Vite 前端开发 | http://localhost:5173 | 5173 | 开发服务器 |
| Vite 预览构建 | http://localhost:4173 | 4173 | `npm run preview` |

## 开发流程

### 后端开发

1. 在 `backend/Application/Home/Controller/` 目录下创建或修改控制器
2. 在 `backend/Application/Home/Model/` 目录下创建模型（如需要）
3. 数据库配置位于 `backend/Application/Common/Conf/config.php`
4. 实现 RESTful API 接口并返回 JSON

### 前端开发

1. 在 `frontend/src/components/` 目录下创建或修改组件
2. 在 `frontend/src/views/Home.vue` 中组装页面区块
3. 在 `frontend/src/api.ts` 中封装 API 请求
4. 使用 GSAP + ScrollTrigger 实现滚动动画

## 注意事项

- 确保 PHP 版本 >= 7.3.4，且已启用 `pdo_sqlite` 扩展
- 确保 Node.js 版本支持 ES6+ 语法（推荐 18+）
- 开发阶段 `APP_DEBUG` 已开启，部署到生产环境建议关闭
- 前端默认使用 TypeScript
- 数据库文件 `contact_messages.sqlite` 在首次成功提交联系表单时自动创建
- `admin_messages.php` 默认 token 为 `rickqin2024`，公网部署前务必修改

## 相关文档

- [TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md) — 联系表单数据库集成详细技术文档
- [README.md](README.md) — GitHub 项目说明文档

## License

MIT License
