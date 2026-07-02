<?php
namespace Home\Controller;

use Think\Controller;

class ApiController extends Controller
{
    /**
     * 联系表单数据库文件路径
     * 当数据库不存在时会自动创建
     */
    const DB_PATH = DATA_PATH . 'contact_messages.sqlite';

    /**
     * 每 IP 每小时最大提交次数（简单防刷）
     */
    const RATE_LIMIT_PER_HOUR = 30;

    public function works()
    {
        $this->setCorsHeaders();
        header('Content-Type: application/json');

        $works = array(
            array(
                'id' => 1,
                'title' => '企业安全体系建设',
                'type' => '网络安全',
                'description' => '为大型金融机构构建完整的网络安全防护体系，包括防火墙部署、入侵检测系统和安全审计系统。',
                'cover' => 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cybersecurity%20network%20protection%20dark%20theme%20technology%20abstract&image_size=landscape_16_9',
                'date' => '2024.11'
            ),
            array(
                'id' => 2,
                'title' => '业务系统开发',
                'type' => '全栈开发',
                'description' => '为企业定制开发高性能业务管理系统，覆盖流程审批、数据可视化与权限控制等核心模块。',
                'cover' => 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=business%20system%20development%20dashboard%20dark%20theme%20modern%20UI%20data%20visualization&image_size=landscape_16_9',
                'date' => '2024.6'
            ),
            array(
                'id' => 3,
                'title' => '全链路建网',
                'type' => '网站建设',
                'description' => '从架构设计到部署运维，构建高可用、可扩展的全链路网络基础设施与网站服务体系。',
                'cover' => 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=full%20link%20network%20construction%20topology%20dark%20theme%20technology%20infrastructure&image_size=landscape_16_9',
                'date' => '2025.2'
            ),
            array(
                'id' => 4,
                'title' => '漏洞挖掘渗透测试',
                'type' => '安全服务',
                'description' => '提供专业的漏洞挖掘与渗透测试服务，帮助企业发现潜在风险并给出修复方案。',
                'cover' => 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=penetration%20testing%20vulnerability%20mining%20cybersecurity%20dark%20theme%20hacker%20terminal&image_size=landscape_16_9',
                'date' => '2025.9'
            ),
            array(
                'id' => 5,
                'title' => 'Tuan-LRY',
                'type' => 'girlfriend',
                'description' => '浪漫至死不渝，我爱你李柔雨',
                'cover' => '/images/work-tuan-lry.jpg',
                'date' => '2024.10.23'
            )
        );

        echo json_encode(array('code' => 200, 'data' => $works, 'message' => 'success'));
    }

    /**
     * 联系表单提交接口
     * 接收 name / email / message，校验通过后写入 SQLite
     */
    public function messages()
    {
        $this->setCorsHeaders();
        header('Content-Type: application/json');

        // 处理预检请求
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(204);
            echo json_encode(array('code' => 200, 'data' => array(), 'message' => 'OK'));
            return;
        }

        if (!IS_POST) {
            http_response_code(405);
            echo json_encode(array('code' => 405, 'data' => array(), 'message' => '请求方式不允许，请使用 POST'));
            return;
        }

        // 获取并过滤输入（ThinkPHP I 函数默认会执行 htmlspecialchars）
        $name    = trim(I('post.name', '', 'strip_tags,trim'));
        $email   = trim(I('post.email', '', 'strip_tags,trim'));
        $message = trim(I('post.message', '', 'strip_tags,trim'));

        // 后端字段校验
        $errors = array();

        if (empty($name)) {
            $errors['name'] = '请输入您的姓名';
        } elseif (mb_strlen($name, 'UTF-8') > 100) {
            $errors['name'] = '姓名长度不能超过 100 个字符';
        }

        if (empty($email)) {
            $errors['email'] = '请输入您的邮箱';
        } elseif (mb_strlen($email, 'UTF-8') > 255) {
            $errors['email'] = '邮箱长度不能超过 255 个字符';
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = '请输入有效的邮箱地址';
        }

        if (empty($message)) {
            $errors['message'] = '请输入留言内容';
        } elseif (mb_strlen($message, 'UTF-8') > 2000) {
            $errors['message'] = '留言内容不能超过 2000 个字符';
        }

        if (!empty($errors)) {
            http_response_code(422);
            echo json_encode(array('code' => 422, 'data' => array('errors' => $errors), 'message' => '表单校验失败，请检查输入内容'));
            return;
        }

        try {
            $pdo = $this->getDbConnection();

            // 简单速率限制：按 IP 每小时最多提交 N 次
            $ip = $this->getClientIp();
            $stmt = $pdo->prepare("SELECT COUNT(*) AS cnt FROM contact_messages WHERE ip = :ip AND created_at > datetime('now', '-1 hour')");
            $stmt->execute(array(':ip' => $ip));
            $count = $stmt->fetchColumn();

            if ($count >= self::RATE_LIMIT_PER_HOUR) {
                http_response_code(429);
                echo json_encode(array('code' => 429, 'data' => array(), 'message' => '提交过于频繁，请稍后再试'));
                return;
            }

            // 使用预处理语句插入数据，防止 SQL 注入
            $insert = $pdo->prepare("INSERT INTO contact_messages (name, email, message, ip, created_at) VALUES (:name, :email, :message, :ip, datetime('now'))");
            $insert->execute(array(
                ':name'    => $name,
                ':email'   => $email,
                ':message' => $message,
                ':ip'      => $ip
            ));

            echo json_encode(array(
                'code'    => 200,
                'data'    => array('id' => $pdo->lastInsertId()),
                'message' => '留言提交成功！'
            ));
        } catch (\PDOException $e) {
            // 记录日志便于排查，但返回给前端的信息不暴露细节
            \Think\Log::record('Contact form DB error: ' . $e->getMessage(), \Think\Log::ERR);
            http_response_code(500);
            echo json_encode(array('code' => 500, 'data' => array(), 'message' => '服务器繁忙，请稍后重试'));
        }
    }

    public function _empty()
    {
        $this->setCorsHeaders();
        header('Content-Type: application/json');
        http_response_code(404);
        echo json_encode(array('code' => 404, 'data' => array(), 'message' => 'API Not Found'));
    }

    /**
     * 设置跨域响应头
     */
    private function setCorsHeaders()
    {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
    }

    /**
     * 获取 SQLite PDO 连接，并在数据库不存在时自动创建表
     */
    private function getDbConnection()
    {
        // 确保数据目录存在
        if (!is_dir(DATA_PATH)) {
            mkdir(DATA_PATH, 0755, true);
        }

        $dbFile = self::DB_PATH;
        $isNewDb = !file_exists($dbFile);

        $pdo = new \PDO('sqlite:' . $dbFile, null, null, array(
            \PDO::ATTR_ERRMODE            => \PDO::ERRMODE_EXCEPTION,
            \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
            \PDO::ATTR_EMULATE_PREPARES   => false,
        ));

        // 如果是新创建的数据库文件，自动建表
        if ($isNewDb) {
            $pdo->exec("CREATE TABLE IF NOT EXISTS contact_messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                ip VARCHAR(45) DEFAULT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )");
            $pdo->exec("CREATE INDEX IF NOT EXISTS idx_created_at ON contact_messages (created_at)");
            $pdo->exec("CREATE INDEX IF NOT EXISTS idx_ip ON contact_messages (ip)");
        }

        return $pdo;
    }

    /**
     * 获取客户端真实 IP
     */
    private function getClientIp()
    {
        $keys = array('HTTP_X_FORWARDED_FOR', 'HTTP_CLIENT_IP', 'REMOTE_ADDR');
        foreach ($keys as $key) {
            if (!empty($_SERVER[$key])) {
                $ips = explode(',', $_SERVER[$key]);
                $ip = trim($ips[0]);
                if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
                    return $ip;
                }
                return $ip;
            }
        }
        return '0.0.0.0';
    }
}
