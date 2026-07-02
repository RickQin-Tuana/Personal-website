# 联系表单数据库集成 — 技术文档

## 1. 功能概述

将首页 `ContactSection.vue` 中的联系表单从纯前端提交改造为前后端分离架构：

- 前端收集姓名、邮箱、留言内容并进行实时校验；
- 通过 axios 调用后端 API；
- 后端使用 ThinkPHP 3.2 控制器接收请求，使用 PDO + SQLite 持久化存储；
- 数据库与数据表在首次请求时自动创建；
- 实现了字段校验、错误处理、IP 速率限制与 SQL 注入防护。

## 2. 数据库信息

| 项目 | 说明 |
|------|------|
| 数据库类型 | SQLite |
| SQLite 版本 | 3.24.0（由 PHP pdo_sqlite 扩展提供） |
| 数据库文件 | `backend/Application/Runtime/Data/contact_messages.sqlite` |
| 数据表 | `contact_messages` |
| 字符集 | UTF-8 |

### 2.1 表结构

```sql
CREATE TABLE contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    ip VARCHAR(45) DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_created_at ON contact_messages (created_at);
CREATE INDEX idx_ip ON contact_messages (ip);
```

### 2.2 数据库创建位置

数据库文件由后端在首次收到合法 POST 请求时自动创建，创建路径为：

```
f:\God'sChoice\Vibe Coding project\Personal website\backend\Application\Runtime\Data\contact_messages.sqlite
```

对应代码常量：`ApiController::DB_PATH = DATA_PATH . 'contact_messages.sqlite'`。

## 3. 查看已提交的留言

### 3.1 网页管理后台（推荐）

已创建一个简单的只读管理页面，用于查看所有联系留言。

| 项目 | 说明 |
|------|------|
| 文件路径 | `backend/Public/admin_messages.php` |
| 访问地址 | `http://localhost:8080/admin_messages.php?token=rickqin2024` |
| 默认密钥 | `rickqin2024` |
| 功能 | 分页展示 ID、提交时间、姓名、邮箱、IP、留言内容 |
| 安全机制 | URL token 校验；输出前 htmlspecialchars 防 XSS |

> **注意**：部署到公网前，请将默认密钥 `rickqin2024` 修改为强密码，或改用登录态 / IP 白名单。

### 3.2 直接查看 SQLite 数据库

也可以使用 SQLite 客户端直接打开数据库文件：

```
f:\God'sChoice\Vibe Coding project\Personal website\backend\Application\Runtime\Data\contact_messages.sqlite
```

推荐工具：DB Browser for SQLite、DBeaver。

## 4. 接口说明

### 4.1 获取作品列表

- **URL**: `GET /Home/Api/works`
- **描述**: 返回作品列表（保留原接口）
- **响应示例**:

```json
{
  "code": 200,
  "data": [...],
  "message": "success"
}
```

### 4.2 提交联系表单

- **URL**: `POST /Home/Api/messages`
- **Content-Type**: `application/x-www-form-urlencoded; charset=UTF-8`
- **参数**:

| 字段 | 类型 | 必填 | 限制 |
|------|------|------|------|
| name | string | 是 | 1-100 字符 |
| email | string | 是 | 1-255 字符，需符合邮箱格式 |
| message | string | 是 | 1-2000 字符 |

- **成功响应 (200)**:

```json
{
  "code": 200,
  "data": { "id": 1 },
  "message": "留言提交成功！"
}
```

- **校验失败响应 (422)**:

```json
{
  "code": 422,
  "data": {
    "errors": {
      "name": "请输入您的姓名",
      "email": "请输入有效的邮箱地址",
      "message": "请输入留言内容"
    }
  },
  "message": "表单校验失败，请检查输入内容"
}
```

- **速率限制响应 (429)**: 同一 IP 1 小时内最多提交 30 次。
- **服务器错误响应 (500)**: 数据库操作异常，不暴露内部错误详情。

## 5. 技术栈与版本

### 5.1 前端

| 技术/库 | 版本 | 用途 |
|---------|------|------|
| Vue | 3.5.34 | 组件框架 |
| TypeScript | 6.0.3 | 类型安全 |
| Vite | 8.0.16 | 构建工具与开发服务器 |
| @vitejs/plugin-vue | 6.0.6 | Vue SFC 编译 |
| @vitejs/plugin-react | 6.0.3 | React 组件支持（Lanyard 等） |
| @tailwindcss/vite | 4.3.1 | Tailwind CSS 集成 |
| Tailwind CSS | 4.3.1 | 原子化 CSS |
| axios | 1.18.0 | HTTP 请求 |
| GSAP | 3.15.0 | 动画与 ScrollTrigger |
| motion-v | 2.3.0 | 动画库 |
| lucide-vue-next | 0.577.0 | 图标 |
| @vueuse/core | 14.3.0 | Vue 组合式工具 |
| vue-router | 4.6.4 | 路由 |

### 5.2 后端

| 技术/库 | 版本 | 用途 |
|---------|------|------|
| PHP | 7.3.4 NTS | 服务端脚本 |
| ThinkPHP | 3.2.x | PHP MVC 框架 |
| PDO | PHP 内置 | 数据库访问抽象 |
| pdo_sqlite | PHP 内置扩展 | SQLite 数据库驱动 |
| SQLite | 3.24.0 | 嵌入式关系型数据库 |

### 5.3 开发/运行环境

| 工具 | 版本/说明 |
|------|-----------|
| 操作系统 | Windows（当前开发环境） |
| Web 服务器 | PHP 内置开发服务器 / phpStudy / Nginx / Apache 均可 |
| 后端入口 | `backend/Public/index.php` |
| 开发代理 | Vite dev server proxy → `http://localhost:8080` |

## 5. 项目文件变更

| 文件 | 说明 |
|------|------|
| `frontend/src/api.ts` | 新增：axios 封装、submitMessage、fetchWorks |
| `frontend/src/components/ContactSection.vue` | 修改：表单校验、错误提示、提交状态管理 |
| `frontend/vite.config.ts` | 修改：增加 `/api` 代理配置 |
| `backend/Application/Common/Conf/config.php` | 修改：SQLite 数据库配置 |
| `backend/Application/Home/Controller/ApiController.class.php` | 修改：实现 messages() 接口，含校验、建库、写入、错误处理 |
| `backend/Public/admin_messages.php` | 新增：留言查看管理页 |

## 6. 本地启动方式

### 6.1 启动后端（PHP 内置服务器示例）

```powershell
& "F:\phpstudy\phpstudy_pro\Extensions\php\php7.3.4nts\php.exe" `
  -S localhost:8080 `
  -t "f:\God'sChoice\Vibe Coding project\Personal website\backend\Public"
```

### 6.2 启动前端

```bash
cd frontend
npm run dev
```

前端通过 Vite 代理将 `/api/Home/Api/messages` 转发到 `http://localhost:8080/Home/Api/messages`。

## 7. 安全与最佳实践

1. **输入过滤**：后端使用 ThinkPHP `I()` 函数默认执行 `htmlspecialchars`，并追加 `strip_tags`、`trim`。
2. **SQL 注入防护**：使用 PDO 预处理语句（prepare/execute）。
3. **XSS 防护**：输出前对输入进行 HTML 转义。
4. **邮箱格式校验**：前端正则 + 后端 `filter_var($email, FILTER_VALIDATE_EMAIL)` 双重校验。
5. **长度限制**：前后端统一限制姓名 100 字符、邮箱 255 字符、留言 2000 字符。
6. **速率限制**：按 IP 每小时最多 30 次提交，防止滥用。
7. **错误信息隐藏**：数据库异常记录到 ThinkPHP 日志，前端仅返回通用提示。
8. **CORS**：接口返回 `Access-Control-Allow-Origin: *`，支持跨域开发调试。
9. **管理页访问控制**：通过 URL token 限制访问，输出前转义留言内容。

## 8. 测试结果

| 测试项 | 结果 |
|--------|------|
| 前端生产构建 | 通过 (`npm run build`) |
| 获取作品列表 | 通过，返回 JSON 数据 |
| 合法表单提交 | 通过，返回 `code: 200, id: 1`，数据已入库 |
| 空字段提交 | 通过，返回 `code: 422` 及字段级错误 |
| 无效邮箱提交 | 通过，返回邮箱格式错误 |
| 数据库自动创建 | 通过，文件创建于 `backend/Application/Runtime/Data/contact_messages.sqlite` |
| 表结构验证 | 通过，字段与索引正确 |
| 管理页查看 | 通过，可正常展示已提交留言 |
