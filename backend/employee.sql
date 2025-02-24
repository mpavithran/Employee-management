CREATE TABLE `employee_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `mail_id` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(255) DEFAULT NULL,
  `created_datetime` datetime DEFAULT NULL,
  `edited_datetime` datetime DEFAULT NULL,
  `deleted_datetime` datetime DEFAULT NULL,
  `status` int(11) DEFAULT '1' COMMENT '1 - Active, 2- Inactive',
  PRIMARY KEY (`id`)
);

CREATE TABLE `log_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activity` text,
  `type` varchar(255) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `editor` varchar(255) DEFAULT NULL,
  `created_datetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `api_track_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `method` varchar(25) DEFAULT NULL,
  `request` text,
  `response` text,
  `status_code` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_datetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_token` text,
  `user_type` varchar(255) DEFAULT NULL,
  `created_datetime` datetime DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
