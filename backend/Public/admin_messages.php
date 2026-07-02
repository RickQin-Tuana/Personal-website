<?php
/**
 * 联系留言管理查看页
 * 访问地址：http://your-domain/admin_messages.php?token=rickqin2024
 *
 * 安全说明：
 * 1. 此页面仅用于本地或受信任内网环境查看留言；
 * 2. 通过 URL token 进行简单访问控制，部署到公网前建议改为登录态或 IP 白名单；
 * 3. 输出前对留言内容执行 htmlspecialchars，防止 XSS。
 */

// 访问密钥（部署到生产环境前请修改为一个强密码）
define('ADMIN_TOKEN', 'rickqin2024');

// 数据库路径
$dbPath = realpath(__DIR__ . '/../Application/Runtime/Data/contact_messages.sqlite');
if (!$dbPath) {
    $dbPath = __DIR__ . '/../Application/Runtime/Data/contact_messages.sqlite';
}

// 校验 token
$token = isset($_GET['token']) ? trim($_GET['token']) : '';
$isAuthorized = ($token === ADMIN_TOKEN);

// 分页参数
$page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
$perPage = 20;
$offset = ($page - 1) * $perPage;

$messages = array();
$total = 0;
$dbError = '';

if ($isAuthorized && file_exists($dbPath)) {
    try {
        $pdo = new PDO('sqlite:' . $dbPath);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $totalStmt = $pdo->query('SELECT COUNT(*) FROM contact_messages');
        $total = intval($totalStmt->fetchColumn());

        $stmt = $pdo->prepare('SELECT id, name, email, message, ip, created_at FROM contact_messages ORDER BY id DESC LIMIT :limit OFFSET :offset');
        $stmt->bindValue(':limit', $perPage, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {
        $dbError = $e->getMessage();
    }
}

$totalPages = max(1, ceil($total / $perPage));
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>联系留言管理</title>
    <style>
        * { box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background: #0f0f1a;
            color: #e0e0e0;
            margin: 0;
            padding: 2rem;
            line-height: 1.6;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        h1 {
            color: #fff;
            margin: 0 0 0.5rem;
            font-size: 1.75rem;
        }
        .meta {
            color: #888;
            font-size: 0.875rem;
            margin-bottom: 1.5rem;
        }
        .meta code {
            background: rgba(255,255,255,0.08);
            padding: 0.15rem 0.4rem;
            border-radius: 4px;
            color: #ccc;
        }
        .alert {
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1.5rem;
        }
        .alert-error {
            background: rgba(255, 77, 79, 0.12);
            color: #ff4d4f;
            border: 1px solid rgba(255, 77, 79, 0.25);
        }
        .alert-info {
            background: rgba(24, 144, 255, 0.12);
            color: #1890ff;
            border: 1px solid rgba(24, 144, 255, 0.25);
        }
        .alert-empty {
            background: rgba(255, 255, 255, 0.05);
            color: #aaa;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        table {
            width: 100%;
            border-collapse: collapse;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.08);
        }
        th, td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid rgba(255,255,255,0.08);
            vertical-align: top;
        }
        th {
            background: rgba(255, 255, 255, 0.06);
            font-weight: 600;
            color: #fff;
            font-size: 0.875rem;
            white-space: nowrap;
        }
        td {
            font-size: 0.875rem;
            color: #ccc;
        }
        tr:hover td {
            background: rgba(255, 255, 255, 0.02);
        }
        .col-id { width: 60px; }
        .col-time { width: 160px; white-space: nowrap; }
        .col-ip { width: 120px; }
        .col-message {
            max-width: 400px;
            word-break: break-word;
        }
        .pagination {
            margin-top: 1.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
        }
        .pagination a, .pagination span {
            color: #aaa;
            text-decoration: none;
            padding: 0.4rem 0.8rem;
            border-radius: 6px;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.08);
        }
        .pagination a:hover {
            background: rgba(255,255,255,0.1);
            color: #fff;
        }
        .pagination .current {
            background: rgba(24, 144, 255, 0.2);
            color: #1890ff;
            border-color: rgba(24, 144, 255, 0.4);
        }
        .login-form {
            max-width: 400px;
            margin: 4rem auto;
            background: rgba(255,255,255,0.03);
            padding: 2rem;
            border-radius: 12px;
            border: 1px solid rgba(255,255,255,0.08);
        }
        .login-form h2 {
            margin-top: 0;
            color: #fff;
        }
        .login-form input {
            width: 100%;
            padding: 0.75rem 1rem;
            margin: 0.75rem 0 1rem;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 6px;
            color: #fff;
            font-size: 1rem;
        }
        .login-form button {
            width: 100%;
            padding: 0.75rem;
            background: #1890ff;
            color: #fff;
            border: none;
            border-radius: 6px;
            font-size: 1rem;
            cursor: pointer;
        }
        .login-form button:hover {
            background: #40a9ff;
        }
    </style>
</head>
<body>
    <div class="container">
        <?php if (!$isAuthorized): ?>
            <form class="login-form" method="get" action="">
                <h2>联系留言管理</h2>
                <p style="color:#888; font-size:0.875rem;">请输入访问密钥以查看留言。</p>
                <label for="token">访问密钥</label>
                <input type="password" id="token" name="token" placeholder="请输入 token" required autofocus />
                <button type="submit">进入管理页</button>
            </form>
        <?php else: ?>
            <h1>联系留言</h1>
            <div class="meta">
                数据库文件：<code><?php echo htmlspecialchars($dbPath); ?></code> &nbsp;|&nbsp;
                共 <?php echo $total; ?> 条记录 &nbsp;|&nbsp;
                第 <?php echo $page; ?> / <?php echo $totalPages; ?> 页
            </div>

            <?php if ($dbError): ?>
                <div class="alert alert-error">数据库读取失败：<?php echo htmlspecialchars($dbError); ?></div>
            <?php elseif (!file_exists($dbPath)): ?>
                <div class="alert alert-info">数据库文件尚未创建，请在联系表单成功提交一次后自动创建。</div>
            <?php elseif (empty($messages)): ?>
                <div class="alert alert-empty">暂无联系留言。</div>
            <?php else: ?>
                <table>
                    <thead>
                        <tr>
                            <th class="col-id">ID</th>
                            <th class="col-time">提交时间</th>
                            <th>姓名</th>
                            <th>邮箱</th>
                            <th>IP</th>
                            <th>留言内容</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($messages as $msg): ?>
                            <tr>
                                <td><?php echo intval($msg['id']); ?></td>
                                <td><?php echo htmlspecialchars($msg['created_at']); ?></td>
                                <td><?php echo htmlspecialchars($msg['name']); ?></td>
                                <td><?php echo htmlspecialchars($msg['email']); ?></td>
                                <td><?php echo htmlspecialchars($msg['ip'] ?: '-'); ?></td>
                                <td class="col-message"><?php echo nl2br(htmlspecialchars($msg['message'])); ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>

                <?php if ($totalPages > 1): ?>
                    <div class="pagination">
                        <?php if ($page > 1): ?>
                            <a href="?token=<?php echo urlencode($token); ?>&page=<?php echo $page - 1; ?>">上一页</a>
                        <?php else: ?>
                            <span>上一页</span>
                        <?php endif; ?>

                        <span class="current"><?php echo $page; ?> / <?php echo $totalPages; ?></span>

                        <?php if ($page < $totalPages): ?>
                            <a href="?token=<?php echo urlencode($token); ?>&page=<?php echo $page + 1; ?>">下一页</a>
                        <?php else: ?>
                            <span>下一页</span>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>
            <?php endif; ?>
        <?php endif; ?>
    </div>
</body>
</html>
