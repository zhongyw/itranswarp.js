/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Version : 50712
 Source Host           : localhost
 Source Database       : itranswarp

 Target Server Version : 50712
 File Encoding         : utf-8

 Date: 06/14/2016 11:27:17 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `articles`
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `category_id` varchar(50) NOT NULL,
  `cover_id` varchar(50) NOT NULL,
  `content_id` varchar(50) NOT NULL,
  `views` bigint(20) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `tags` varchar(1000) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `publish_at` bigint(20) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `updated_at` bigint(20) NOT NULL,
  `version` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_category_id` (`category_id`),
  KEY `idx_publish_at` (`publish_at`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `attachments`
-- ----------------------------
DROP TABLE IF EXISTS `attachments`;
CREATE TABLE `attachments` (
  `id` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `resource_id` varchar(50) NOT NULL,
  `size` bigint(20) NOT NULL,
  `width` bigint(20) NOT NULL,
  `height` bigint(20) NOT NULL,
  `mime` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `meta` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `updated_at` bigint(20) NOT NULL,
  `version` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `authusers`
-- ----------------------------
DROP TABLE IF EXISTS `authusers`;
CREATE TABLE `authusers` (
  `id` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `auth_provider` varchar(50) NOT NULL,
  `auth_id` varchar(100) NOT NULL,
  `auth_token` varchar(500) NOT NULL,
  `expires_at` bigint(20) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `updated_at` bigint(20) NOT NULL,
  `version` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_auth_id` (`auth_id`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `boards`
-- ----------------------------
DROP TABLE IF EXISTS `boards`;
CREATE TABLE `boards` (
  `id` varchar(50) NOT NULL,
  `topics` bigint(20) NOT NULL,
  `locked` tinyint(1) NOT NULL,
  `tag` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `display_order` bigint(20) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `updated_at` bigint(20) NOT NULL,
  `version` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `categories`
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `tag` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `display_order` bigint(20) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `updated_at` bigint(20) NOT NULL,
  `version` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `comments`
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` varchar(50) NOT NULL,
  `ref_type` varchar(50) NOT NULL,
  `ref_id` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_image_url` varchar(1000) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `updated_at` bigint(20) NOT NULL,
  `version` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `localusers`
-- ----------------------------
DROP TABLE IF EXISTS `localusers`;
CREATE TABLE `localusers` (
  `id` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `passwd` varchar(100) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `updated_at` bigint(20) NOT NULL,
  `version` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_user_id` (`user_id`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `localusers`
-- ----------------------------
BEGIN;
INSERT INTO `localusers` VALUES ('0014639056930435ade2d2bed4040a89cc59c9feeb2e899000', '001463905693041fc48144461f64c419589a229246fd80a000', '729e205f68767074f36f13677c7a3b6d72e27ea8', '1394002009000', '1394002009000', '0');
COMMIT;

-- ----------------------------
--  Table structure for `navigations`
-- ----------------------------
DROP TABLE IF EXISTS `navigations`;
CREATE TABLE `navigations` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `url` varchar(1000) NOT NULL,
  `display_order` bigint(20) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `updated_at` bigint(20) NOT NULL,
  `version` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `pages`
-- ----------------------------
DROP TABLE IF EXISTS `pages`;
CREATE TABLE `pages` (
  `id` varchar(50) NOT NULL,
  `alias` varchar(100) NOT NULL,
  `content_id` varchar(50) NOT NULL,
  `draft` tinyint(1) NOT NULL,
  `name` varchar(100) NOT NULL,
  `tags` varchar(1000) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `updated_at` bigint(20) NOT NULL,
  `version` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_alias` (`alias`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `randoms`
-- ----------------------------
DROP TABLE IF EXISTS `randoms`;
CREATE TABLE `randoms` (
  `id` varchar(50) NOT NULL,
  `value` varchar(100) NOT NULL,
  `expires_time` bigint(20) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `updated_at` bigint(20) NOT NULL,
  `version` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_value` (`value`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `replies`
-- ----------------------------
DROP TABLE IF EXISTS `replies`;
CREATE TABLE `replies` (
  `id` varchar(50) NOT NULL,
  `topic_id` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  `upvotes` bigint(20) NOT NULL,
  `downvotes` bigint(20) NOT NULL,
  `score` bigint(20) NOT NULL,
  `content` text NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `updated_at` bigint(20) NOT NULL,
  `version` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_topic_id` (`topic_id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `resources`
-- ----------------------------
DROP TABLE IF EXISTS `resources`;
CREATE TABLE `resources` (
  `id` varchar(50) NOT NULL,
  `ref_id` varchar(50) NOT NULL,
  `value` mediumblob NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `updated_at` bigint(20) NOT NULL,
  `version` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `settings`
-- ----------------------------
DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `id` varchar(50) NOT NULL,
  `group` varchar(100) NOT NULL,
  `key` varchar(100) NOT NULL,
  `value` text NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `updated_at` bigint(20) NOT NULL,
  `version` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_key` (`key`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `settings`
-- ----------------------------
BEGIN;
INSERT INTO `settings` VALUES ('0014642500522107a0a2305706d44bca0d2b2d0d4e6db1d000', 'website', 'website:name', '充电宝', '1464250052211', '1464250052211', '0'), ('00146425005221858cce5c210a0404bbd32f1032c1e4d16000', 'website', 'website:description', 'Powered by iTranswarp.js', '1464250052218', '1464250052218', '0'), ('001464250052225f9bc3fdde46d4139a14fbbbc58ab0431000', 'website', 'website:keywords', '', '1464250052225', '1464250052225', '0'), ('001464250052233fbb2647c673347eba219353f9faa5d5a000', 'website', 'website:xmlns', '', '1464250052233', '1464250052233', '0'), ('00146425005223610240bd0e9974168b164d82651d85034000', 'website', 'website:custom_header', '<!-- custom header -->', '1464250052236', '1464250052236', '0'), ('001464250052240f9671af4dcd14c6faaa8784a722915dc000', 'website', 'website:custom_footer', '', '1464250052240', '1464250052240', '0');
COMMIT;

-- ----------------------------
--  Table structure for `texts`
-- ----------------------------
DROP TABLE IF EXISTS `texts`;
CREATE TABLE `texts` (
  `id` varchar(50) NOT NULL,
  `ref_id` varchar(50) NOT NULL,
  `value` mediumtext NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `updated_at` bigint(20) NOT NULL,
  `version` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `topics`
-- ----------------------------
DROP TABLE IF EXISTS `topics`;
CREATE TABLE `topics` (
  `id` varchar(50) NOT NULL,
  `board_id` varchar(50) NOT NULL,
  `ref_type` varchar(50) NOT NULL,
  `ref_id` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `replies` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `tags` varchar(1000) NOT NULL,
  `upvotes` bigint(20) NOT NULL,
  `downvotes` bigint(20) NOT NULL,
  `score` bigint(20) NOT NULL,
  `locked` tinyint(1) NOT NULL,
  `content` text NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `updated_at` bigint(20) NOT NULL,
  `version` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_board_id` (`board_id`),
  KEY `idx_ref_id` (`ref_id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` varchar(50) NOT NULL,
  `role` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `verified` tinyint(1) NOT NULL,
  `image_url` varchar(1000) NOT NULL,
  `locked_until` bigint(20) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `updated_at` bigint(20) NOT NULL,
  `version` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_email` (`email`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `users`
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES ('001463905693041fc48144461f64c419589a229246fd80a000', '0', 'Admin', 'zw198307@163.com', '1', '/static/img/user.png', '0', '1394002009000', '1394002009000', '0');
COMMIT;

-- ----------------------------
--  Table structure for `wikipages`
-- ----------------------------
DROP TABLE IF EXISTS `wikipages`;
CREATE TABLE `wikipages` (
  `id` varchar(50) NOT NULL,
  `wiki_id` varchar(50) NOT NULL,
  `parent_id` varchar(50) NOT NULL,
  `content_id` varchar(50) NOT NULL,
  `views` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `display_order` bigint(20) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `updated_at` bigint(20) NOT NULL,
  `version` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `wikis`
-- ----------------------------
DROP TABLE IF EXISTS `wikis`;
CREATE TABLE `wikis` (
  `id` varchar(50) NOT NULL,
  `cover_id` varchar(50) NOT NULL,
  `content_id` varchar(50) NOT NULL,
  `views` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `tag` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `updated_at` bigint(20) NOT NULL,
  `version` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
