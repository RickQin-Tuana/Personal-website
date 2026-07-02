<?php
return array(
	// SQLite 数据库配置（联系表单数据持久化）
	'DB_TYPE'               => 'sqlite',
	'DB_NAME'               => DATA_PATH . 'contact_messages.sqlite',
	'DB_PREFIX'             => '',
	'DB_CHARSET'            => 'utf8',
	'DB_DEBUG'              => false, // 生产环境关闭数据库调试
	'DB_FIELDS_CACHE'       => false,
);
