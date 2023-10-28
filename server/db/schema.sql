CREATE TABLE `facilities` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`login` VARCHAR(50) NOT NULL DEFAULT '0',
	`password` VARCHAR(50) NOT NULL DEFAULT '0',
	`facilityName` VARCHAR(50) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
)
COLLATE='latin1_swedish_ci';

CREATE TABLE `factions` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NULL DEFAULT NULL,
	`codeName` VARCHAR(50) NULL DEFAULT NULL,
	`description` VARCHAR(255) NULL DEFAULT NULL,
	PRIMARY KEY (`id`)
)
COLLATE='latin1_swedish_ci';

CREATE TABLE `detachments` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`faction_id` INT NOT NULL DEFAULT 0,
	`name` VARCHAR(50) NOT NULL DEFAULT '0',
	`description` VARCHAR(50) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
)
COLLATE='latin1_swedish_ci';

