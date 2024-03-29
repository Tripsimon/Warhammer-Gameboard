CREATE TABLE `facilities` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`login` VARCHAR(50) NOT NULL DEFAULT '0',
	`password` VARCHAR(64) NOT NULL DEFAULT '0', /* zahashované heslo má 60 znaků */
	`facilityName` VARCHAR(50) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
)
COLLATE='cp1250_czech_cs';

CREATE TABLE `factions` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NULL DEFAULT NULL,
	`codeName` VARCHAR(50) NULL DEFAULT NULL,
	`description` VARCHAR(255) NULL DEFAULT NULL,
	PRIMARY KEY (`id`)
)
COLLATE='cp1250_czech_cs';

CREATE TABLE `detachments` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`faction_id` INT NOT NULL DEFAULT 0,
	`name` VARCHAR(50) NOT NULL DEFAULT '0',
	`description` VARCHAR(50) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
)
COLLATE='cp1250_czech_cs';

CREATE TABLE `stratagems` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`detachment_id` INT NOT NULL DEFAULT 0,
	`name` VARCHAR(50) NOT NULL DEFAULT '0',
	`ability` VARCHAR(50) NOT NULL DEFAULT '0',
	`price` int NOT NULL DEFAULT '0',
	
	PRIMARY KEY (`id`)
)
COLLATE='cp1250_czech_cs';

CREATE TABLE `secondaryObjectives` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL DEFAULT '0',
	`objective` VARCHAR(50) NOT NULL DEFAULT '0',
	`owner` ENUM('atacker','defender') NOT NULL DEFAULT 'atacker',
	PRIMARY KEY (`id`)
)
COLLATE='cp1250_czech_cs';

CREATE TABLE `matches` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL DEFAULT 'Bitva',
	`round` INT NOT NULL DEFAULT '0',
	`playerOne` INT NOT NULL DEFAULT '0',
	`playerTwo` INT NOT NULL DEFAULT '0',
	`facility_id` INT NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
)
COLLATE='cp1250_czech_cs';

CREATE TABLE `matchPlayers` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL DEFAULT '0',
	`faction` INT NOT NULL DEFAULT '0',
	`detachment` INT NOT NULL DEFAULT '0',
	`role` INT NOT NULL DEFAULT '0',
	`cp` INT NOT NULL DEFAULT '0',
	`vpPrimary1` INT NOT NULL DEFAULT '0',
	`vpPrimary2` INT NOT NULL DEFAULT '0',
	`vpPrimary3` INT NOT NULL DEFAULT '0',
	`vpPrimary4` INT NOT NULL DEFAULT '0',
	`vpPrimary5` INT NOT NULL DEFAULT '0',
	`vpSecondary1` INT NOT NULL DEFAULT '0',
	`vpSecondary2` INT NOT NULL DEFAULT '0',
	`vpSecondary3` INT NOT NULL DEFAULT '0',
	`vpSecondary4` INT NOT NULL DEFAULT '0',
	`vpSecondary5` INT NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
)
COLLATE='cp1250_czech_cs';

 /* 
 Tabulka pro různá nastavení, je zde uloženo admin heslo
 */
CREATE TABLE `settings` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`key1` VARCHAR(50) NOT NULL DEFAULT '0',
	`value1` VARCHAR(64) NOT NULL DEFAULT '0', /* zahashované heslo má 60 znaků */
	`value2` VARCHAR(50) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
)
COLLATE='cp1250_czech_cs';



