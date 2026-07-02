# RickQin Portfolio — 个人作品集网站

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vue](https://img.shields.io/badge/Vue-3.5.34-42b883.svg)
![Vite](https://img.shields.io/badge/Vite-8.0.16-646cff.svg)
![ThinkPHP](https://img.shields.io/badge/ThinkPHP-3.2-000000.svg)
![PHP](https://img.shields.io/badge/PHP-7.3.4-777bb4.svg)

## 目录

- [项目介绍](#项目介绍)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [安装与运行](#安装与运行)
- [主要功能模块](#主要功能模块)
- [可访问页面与接口](#可访问页面与接口)
- [已知问题与限制](#已知问题与限制)
- [未来迭代计划](#未来迭代计划)
- [版权信息](#版权信息)

## 项目介绍

### 项目背景

RickQin Portfolio 是一个面向设计师 / 开发者风格的个人作品集网站，旨在以高质感的视觉动效和清晰的信息架构展示个人品牌、职业经历、项目作品与技术能力。项目最初为静态展示页面，后续逐步扩展为前后端分离架构，支持动态作品数据获取与联系表单数据持久化。

### 项目目的

- 打造具有视觉冲击力的个人主页，提升专业形象
- 通过动画与交互增强访客体验
- 提供可提交的联系表单，并将访客留言安全持久化
- 作为全栈开发能力的综合展示

### 主要功能

- 单页滚动式首页，集成 Hero、关于我、精选作品、技能优势、联系我五大区块
- GSAP + ScrollTrigger 驱动的入场动画与视差效果
- 3D Lanyard 吊牌交互组件
- 作品列表后端 API + 本地 mock 数据双重保障
- 联系表单前后端双重校验、SQLite 持久化、IP 速率限制
- 简易留言管理后台，支持 token 访问控制

## 技术栈

### 前端

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | 3.5.34 | 渐进式前端框架 |
| TypeScript | 6.0.3 | 类型安全的 JavaScript 超集 |
| Vite | 8.0.16 | 下一代前端构建工具 |
| Vue Router | 4.6.4 | 单页应用路由管理 |
| Axios | 1.18.0 | HTTP 客户端 |
| GSAP | 3.15.0 | 专业级 Web 动画库 |
| motion-v | 2.3.0 | Vue 动画辅助库 |
| Three.js | 0.164.1 | WebGL 3D 渲染引擎 |
| @react-three/fiber | 8.17.5 | React 端的 Three.js 渲染器 |
| @react-three/drei | 9.108.3 | React Three Fiber 辅助组件 |
| @react-three/rapier | 1.3.1 | 物理引擎封装 |
| lucide-vue-next | 0.577.0 | 图标库 |
| @vueuse/core | 14.3.0 | Vue 组合式工具集 |
| Tailwind CSS | 4.3.1 | 原子化 CSS 框架 |
| @tailwindcss/vite | 4.3.1 | Tailwind CSS Vite 插件 |

### 后端

| 技术 | 版本 | 说明 |
|------|------|------|
| ThinkPHP | 3.2.x | 国产 PHP MVC 框架 |
| PHP | 7.3.4 NTS | 服务端脚本语言 |
| SQLite | 3.24.0 | 嵌入式关系型数据库 |
| pdo_sqlite | PHP 内置扩展 | SQLite PDO 驱动 |

### 工具与环境

| 工具 | 版本 | 说明 |
|------|------|------|
| npm | - | Node.js 包管理器 |
| Git | - | 版本控制 |
| phpStudy | - | 本地 PHP 环境管理（推荐） |
| Puppeteer Core | 25.2.1 | 浏览器自动化工具 |

## 项目结构

```
Personal website/
├── README.md                             # 本文件
├── agent.md                              # 项目内部技术文档
├── TECHNICAL_DOCUMENTATION.md            # 联系表单数据库集成文档
├── backend/                              # ThinkPHP 后端
│   ├── Application/
│   │   ├── Common/Conf/config.php        # 全局配置（SQLite 数据库）
│   │   ├── Home/Controller/ApiController.class.php  # API 控制器
│   │   └── Runtime/Data/                 # SQLite 数据库文件目录
│   ├── Public/                           # Web 入口
│   │   ├── index.php                     # ThinkPHP 入口
│   │   └── admin_messages.php            # 留言管理后台
│   └── ThinkPHP/                         # ThinkPHP 框架核心
└── frontend/                             # Vue 3 前端
    ├── src/
    │   ├── api.ts                        # Axios API 封装
    │   ├── components/                   # 页面区块组件
    │   │   ├── HeroSection.vue
    │   │   ├── AboutSection.vue
    │   │   ├── WorksSection.vue
    │   │   ├── SkillsSection.vue
    │   │   ├── ContactSection.vue
    │   │   ├── NavBar.vue
    │   │   └── LanyardWrapper.vue
    │   ├── data/mock.ts                  # 本地静态数据
    │   ├── router/index.ts               # 路由配置
    │   └── views/Home.vue                # 首页视图
    ├── public/images/                    # 静态图片资源
    ├── vite.config.ts                    # Vite 配置（含代理）
    └── package.json                      # 项目依赖
```

## 安装与运行

### 环境要求

- PHP >= 7.3.4，且已启用 `pdo_sqlite` 扩展
- Node.js >= 18
- npm

### 1. 克隆项目

```bash
git clone <repository-url>
cd "Personal website"
```

### 2. 安装前端依赖

```bash
cd frontend
npm install
```

### 3. 启动后端服务

方式一：PHP 内置开发服务器（推荐本地调试）

```powershell
php -S localhost:8080 -t backend/Public
```

> 在 Windows phpStudy 环境下，若 PHP 不在 PATH 中，可使用完整路径：
> ```powershell
> & "F:\phpstudy\phpstudy_pro\Extensions\php\php7.3.4nts\php.exe" `
>   -S localhost:8080 `
>   -t "backend/Public"
> ```

方式二：通过 phpStudy / Nginx / Apache 配置虚拟主机，将根目录指向 `backend/Public`。

### 4. 启动前端开发服务器

```bash
cd frontend
npm run dev
```

前端默认运行在 http://localhost:5173，Vite 会将 `/api` 路径代理到 http://localhost:8080。

### 5. 生产构建

```bash
cd frontend
npm run build
```

构建产物位于 `frontend/dist/`。

## 主要功能模块

### 1. Hero 首屏

- 位置：页面顶部
- 功能：个人品牌展示、动态标题、简介、导航入口
- 路径：`/#hero`

### 2. 关于我 / 工作经历

- 位置：`#about` 锚点区域
- 功能：个人简介、头像 3D 卡片悬停交互、职业经历时间线
- 路径：`/#about`

### 3. 精选作品

- 位置：`#works` 锚点区域
- 功能：作品列表、鼠标悬停显示作品预览图、支持后端 API 与本地 mock 降级
- 路径：`/#works`
- API：`GET http://localhost:8080/Home/Api/works`

### 4. 个人优势

- 位置：`#skills` 锚点区域
- 功能：技能卡片网格展示
- 路径：`/#skills`

### 5. 联系我

- 位置：`#contact` 锚点区域
- 功能：联系表单（姓名、邮箱、留言），前端实时校验，后端二次校验并写入 SQLite
- 路径：`/#contact`
- API：`POST http://localhost:8080/Home/Api/messages`
- 参数：`name`, `email`, `message`

### 6. Lanyard 3D 吊牌

- 位置：弹窗覆盖层
- 功能：可拖拽、可旋转的 3D 吊牌模型
- 触发方式：点击顶部导航栏「Lanyard」按钮

### 7. 留言管理后台

- 功能：查看所有联系表单提交记录
- 路径：`http://localhost:8080/admin_messages.php?token=rickqin2024`
- 权限：需要 URL token，默认值为 `rickqin2024`

## 可访问页面与接口

### 前端页面

| 页面 / 区域 | 描述 | 路径 | 访问方式 | 权限 |
|------------|------|------|---------|------|
| 首页 | 网站主页面 | `/` | 直接访问 | 公开 |
| Hero | 首屏品牌区 | `/#hero` | 页面加载默认 / 点击品牌 | 公开 |
| 工作经历 | 关于我与经历 | `/#about` | 导航菜单「工作经历」 | 公开 |
| 精选作品 | 作品展示 | `/#works` | 导航菜单「精选作品」 | 公开 |
| 个人优势 | 技能展示 | `/#skills` | 导航菜单「个人优势」 | 公开 |
| 联系我 | 联系表单 | `/#contact` | 导航菜单「联系我」 | 公开 |
| Lanyard | 3D 吊牌弹窗 | 覆盖层 | 点击「Lanyard」按钮 | 公开 |

### 后端 API

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 作品列表 | GET | `/Home/Api/works` | 返回精选作品 JSON |
| 提交留言 | POST | `/Home/Api/messages` | 接收 `name`, `email`, `message` |
| 404 兜底 | - | `/Home/Api/*` | 未匹配接口返回 JSON 404 |

### 管理后台

| 页面 | 路径 | 权限 |
|------|------|------|
| 留言管理 | `http://localhost:8080/admin_messages.php?token=rickqin2024` | 需要 token |

## 已知问题与限制

1. **后端服务需手动启动**：PHP 内置服务器不是常驻服务，关闭终端后需要重新启动。
2. **留言管理后台无登录体系**：当前仅通过简单的 URL token 控制访问，公网部署前必须增强认证或限制 IP。
3. **默认 token 强度不足**：`rickqin2024` 仅为本地开发使用，生产环境请修改。
4. **SQLite 并发能力有限**：适合个人站点低并发场景，高并发场景建议迁移至 MySQL / PostgreSQL。
5. **前端资源体积较大**：Three.js、React 生态与 GSAP 导致构建产物较大，后续可考虑懒加载与代码分割。
6. **IE 浏览器不支持**：项目依赖现代 Web API 与 CSS 特性，仅支持现代浏览器。
7. **Works 作品数据后端依赖**：后端可用时优先拉取 API，异常时自动降级到本地 mock，但新增作品需同时更新后端与 mock 数据。

## 未来迭代计划

- [ ] 引入真实的用户登录体系，替代 URL token 管理后台
- [ ] 将 SQLite 迁移至 MySQL，以支持更高并发与多用户管理
- [ ] 为作品模块增加后台管理（增删改查）
- [ ] 实现服务端渲染（SSR）或静态生成（SSG），优化首屏性能与 SEO
- [ ] 接入邮件通知，新留言提交时自动发送邮件提醒
- [ ] 完善单元测试与 E2E 测试覆盖
- [ ] 优化前端包体积，使用动态导入拆分大模块
- [ ] 增加暗/亮主题切换
- [ ] 国际化支持（i18n）

## 版权信息

本项目采用 [MIT License](LICENSE) 开源协议。

Copyright © 2024 RickQin. All rights reserved.

---

> 如有问题或合作意向，欢迎通过网站「联系我」表单留言。
