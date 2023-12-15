package main

import (
	"database/sql"
	"fmt"
	"log"
	"strconv"

	_ "github.com/go-sql-driver/mysql"
	"golang.org/x/crypto/bcrypt"
)

// Typy
type facility struct {
	Id         int    `json:id`
	Login      string `json:login`
	Password   string `json:password`
	ScreenName string `json:screenName`
}

type faction struct {
	Id          int    `json:id`
	Name        string `json:name`
	CodeName    string `json:codeName`
	Description string `json:description`
}

type detachment struct {
	Id          int    `json:id`
	FactionId   int    `json:factionId`
	Name        string `json:name`
	Description string `json:description`
}

type match struct {
	Id        int    `json:id`
	Name      string `json:name`
	Round     int    `json:round`
	PlayerOne int    `json:playerOne`
	PlayerTwo int    `json:playerTwo`
}

type matchPlayer struct {
	Id         int    `json:id`
	Name       string `json:name`
	Faction    int    `json:faction`
	Detachment int    `json:detachment`
	Role       string `json:role`
	Cp         int    `json:cp`
}

/** OLD - ZATÍM NEMAŽU
* Autentikace uživatele do systému

func DBAuthenticateUser(login string, password string) (answer string) {
	log.Println("Připojuji se k DB")
	db, err := sql.Open("mysql", "user:Aa123456@tcp(localhost:3002)/WH")

	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	auth := db.QueryRow("SELECT * FROM facilities WHERE login=?", login)

	result := facility{}

	auth.Scan(&result.Id, &result.Login, &result.Password, &result.ScreenName)

	if result.Id == 0 {
		answer = "User not found"
		return
	}

	if result.Password != password {
		answer = "Wrong Password"
		return
	}

	if result.Password == password {
		answer = strconv.Itoa(result.Id)
		return
	}

	return
}
**/

func DBAuthenticateUser(login string, password string) (userID string, isAdmin bool, err error) {
	log.Println("Připojuji se k DB")
	db, err := sql.Open("mysql", "user:Aa123456@tcp(localhost:3002)/WH")

	if err != nil {
		return "", false, err
	}
	defer db.Close()

	var storedHashedPassword string
	var Id int
	var tableName string

	if login == "admin" {
		tableName = "settings"
		isAdmin = true
	} else {
		tableName = "facilities"
		isAdmin = false
	}

	row := db.QueryRow(fmt.Sprintf("SELECT id, password FROM %s WHERE login=?", tableName), login)
	if err := row.Scan(&Id, &storedHashedPassword); err != nil {
		if err == sql.ErrNoRows {
			return "User not found", isAdmin, nil
		}
		return "", isAdmin, err
	}

	err = bcrypt.CompareHashAndPassword([]byte(storedHashedPassword), []byte(password))
	if err != nil {
		if err == bcrypt.ErrMismatchedHashAndPassword {
			return "Wrong Password", isAdmin, nil
		}
		return "", isAdmin, err
	}

	return strconv.Itoa(Id), isAdmin, nil
}

/**
* Kontrola proti duplicitně založenému loginu
**/
func DBcheckFacilityLogin(login string) (exists bool) {
	log.Println("Připojuji se k DB")
	db, err := sql.Open("mysql", "user:Aa123456@tcp(localhost:3002)/WH")

	if err != nil {
		panic(err.Error())
	}
	defer db.Close()
	query := db.QueryRow("SELECT COUNT(*) FROM facilities WHERE login=?", login)

	var count int
	query.Scan(&count)
	if count != 0 {
		exists = true
		return
	}
	exists = false
	return
}

// Funkce pro vytvoření herny
func DBcreateFacility(login string, password string, facilityName string) {
	log.Println("Připojuji se k DB")
	db, err := sql.Open("mysql", "user:Aa123456@tcp(localhost:3002)/WH")

	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	insert, err := db.Query("INSERT INTO facilities (login, password, facilityName) VALUES (?,?,?)", login, password, facilityName)

	if err != nil {
		panic(err.Error())
	}

	defer insert.Close()
	log.Println("Herna založena")
}

// Funkce pro dotažení všech heren
func DBGetFacilities() (result []facility) {
	log.Println("Připojuji se k DB")
	db, err := sql.Open("mysql", "user:Aa123456@tcp(localhost:3002)/WH")

	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	query, err := db.Query("SELECT * FROM facilities")

	if err != nil {
		panic(err.Error())
	}

	things := []facility{}
	for query.Next() {
		var vec facility
		err := query.Scan(&vec.Id, &vec.Login, &vec.Password, &vec.ScreenName)
		if err != nil {
			log.Fatal(err)
		}

		things = append(things, vec)
	}

	defer query.Close()
	return things

}

// Funkce pro smazání herny
func DBdeleteFacility(id string) {
	log.Println("Připojuji se k DB")
	db, err := sql.Open("mysql", "user:Aa123456@tcp(localhost:3002)/WH")

	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	delete, err := db.Query("DELETE FROM facilities WHERE id = ?", id)

	if err != nil {
		panic(err.Error())
	}

	defer delete.Close()
	log.Println("Herna smazána")
}

// Funkce pro kontrolu, zda se v tabulce factions již nachází stejný název
func DBcheckFactionName(screenName string) (exists bool) {
	log.Println("Připojuji se k DB")
	db, err := sql.Open("mysql", "user:Aa123456@tcp(localhost:3002)/WH")

	if err != nil {
		panic(err.Error())
	}
	defer db.Close()
	query := db.QueryRow("SELECT COUNT(*) FROM factions WHERE name=?", screenName)

	var count int
	query.Scan(&count)
	if count != 0 {
		exists = true
		return
	}
	exists = false
	return
}

// Funkce pro vytvoření frakce
func DBcreateFaction(name string, codeName string, description string) {
	log.Println("Připojuji se k DB")
	db, err := sql.Open("mysql", "user:Aa123456@tcp(localhost:3002)/WH")

	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	insert, err := db.Query("INSERT INTO factions (name, codeName, description) VALUES (?,?,?)", name, codeName, description)

	if err != nil {
		panic(err.Error())
	}

	defer insert.Close()
	log.Println("Frakce založena")
}

// Funkce pro dotažení všech frakcí
func DBGetFactions() (result []faction) {
	log.Println("Připojuji se k DB")
	db, err := sql.Open("mysql", "user:Aa123456@tcp(localhost:3002)/WH")

	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	query, err := db.Query("SELECT * FROM factions")

	if err != nil {
		panic(err.Error())
	}

	things := []faction{}
	for query.Next() {
		var vec faction
		err := query.Scan(&vec.Id, &vec.Name, &vec.CodeName, &vec.Description)
		if err != nil {
			log.Fatal(err)
		}

		things = append(things, vec)
	}

	defer query.Close()
	return things

}

// Funkce pro smazání frakce
func DBdeleteFaction(id string) {
	log.Println("Připojuji se k DB")
	db, err := sql.Open("mysql", "user:Aa123456@tcp(localhost:3002)/WH")

	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	delete, err := db.Query("DELETE FROM factions WHERE id = ?", id)

	if err != nil {
		panic(err.Error())
	}

	defer delete.Close()
	log.Println("Frakce smazána")
}

// Funkce pro vytvoření detachmentu
func DBcreateDetachment(faction_id string, name string, description string) {
	log.Println("Připojuji se k DB")
	db, err := sql.Open("mysql", "user:Aa123456@tcp(localhost:3002)/WH")

	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	insert, err := db.Query("INSERT INTO detachments (faction_id, name, description) VALUES (?,?,?)", faction_id, name, description)

	if err != nil {
		panic(err.Error())
	}

	defer insert.Close()
	log.Println("Detachment založen")
}

// Funkce pro dotažení všech detachmentů
func DBGetDetachments() (result []detachment) {
	log.Println("Připojuji se k DB")
	db, err := sql.Open("mysql", "user:Aa123456@tcp(localhost:3002)/WH")

	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	query, err := db.Query("SELECT * FROM detachments")

	if err != nil {
		panic(err.Error())
	}

	things := []detachment{}
	for query.Next() {
		var vec detachment
		err := query.Scan(&vec.Id, &vec.FactionId, &vec.Name, &vec.Description)
		if err != nil {
			log.Fatal(err)
		}

		things = append(things, vec)
	}

	defer query.Close()
	return things

}

// Funkce pro smazání detachmentu
func DBdeleteDetachment(id string) {
	log.Println("Připojuji se k DB")
	db, err := sql.Open("mysql", "user:Aa123456@tcp(localhost:3002)/WH")

	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	delete, err := db.Query("DELETE FROM detachments WHERE id = ?", id)

	if err != nil {
		panic(err.Error())
	}

	defer delete.Close()
	log.Println("Detachment smazán")
}

// Funkce pro kontrolu, zda se v tabulce detachments již nachází stejný název
func DBcheckDetachmentName(detachmentName string) (exists bool) {
	log.Println("Připojuji se k DB")
	db, err := sql.Open("mysql", "user:Aa123456@tcp(localhost:3002)/WH")

	if err != nil {
		panic(err.Error())
	}
	defer db.Close()
	query := db.QueryRow("SELECT COUNT(*) FROM detachments WHERE name=?", detachmentName)

	var count int
	query.Scan(&count)
	if count != 0 {
		exists = true
		return
	}
	exists = false
	return
}

// Funkce pro vytvoření zápasu
func DBcreateMatch(name string, playerOneName string, playerOneFaction int, playerOneDetachment int, playerTwoName string, playerTwoFaction int, playerTwoDetachment int) {
	log.Println("Připojuji se k DB")
	db, err := sql.Open("mysql", "user:Aa123456@tcp(localhost:3002)/WH")

	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	var playerOne int64
	queryOne, err := db.Exec("INSERT INTO matchPlayers (name, faction, detachment) VALUES (?,?,?)", playerOneName, playerOneFaction, playerOneDetachment)

	if err != nil {
		println("Exec err:", err.Error())
	} else {
		playoerOneID, err := queryOne.LastInsertId()
		if err != nil {
			println("Error:", err.Error())
		} else {
			playerOne = playoerOneID
		}
	}

	var playerTwo int64
	queryTwo, err := db.Exec("INSERT INTO matchPlayers (name, faction, detachment) VALUES (?,?,?)", playerTwoName, playerTwoFaction, playerTwoDetachment)

	if err != nil {
		println("Exec err:", err.Error())
	} else {
		playerTwoID, err := queryTwo.LastInsertId()
		if err != nil {
			println("Error:", err.Error())
		} else {
			playerTwo = playerTwoID
		}
	}

	insert, err := db.Query("INSERT INTO matches (name, round, playerOne, playerTwo) VALUES (?,0,?,?)", name, playerOne, playerTwo)

	defer insert.Close()
	log.Println("Herní místnost založena")
}

// Získá seznam zápasů
func DBGetMatches() (result []match) {
	log.Println("Připojuji se k DB")
	db, err := sql.Open("mysql", "user:Aa123456@tcp(localhost:3002)/WH")

	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	query, err := db.Query("SELECT * FROM matches")

	if err != nil {
		panic(err.Error())
	}

	things := []match{}
	for query.Next() {
		var vec match
		err := query.Scan(&vec.Id, &vec.Name, &vec.Round, &vec.PlayerOne, &vec.PlayerTwo)
		if err != nil {
			log.Fatal(err)
		}

		things = append(things, vec)
	}

	defer query.Close()
	return things

}

func DBGetMatchData(id int) (result match) {

	type matchDataResponse struct {
		Name   string `json:name`
		P1Name string `json:p1name`
	}

	log.Println("Připojuji se k DB")
	db, err := sql.Open("mysql", "user:Aa123456@tcp(localhost:3002)/WH")

	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	var matchData match

	err = db.QueryRow("SELECT * FROM matches WHERE id = ?", id).Scan(&matchData.Id, &matchData.Name, &matchData.Round, &matchData.PlayerOne, &matchData.PlayerTwo)
	if err != nil {
		panic(err.Error())
	}

	var p1Data matchPlayer
	err = db.QueryRow("SELECT * FROM matchPlayers WHERE id = ?", matchData.PlayerOne).Scan(&p1Data.Id)
	if err != nil {
		panic(err.Error())
	}

	var p2Data matchPlayer
	err = db.QueryRow("SELECT * FROM matchPlayers WHERE id = ?", matchData.PlayerTwo).Scan(&p2Data.Id)
	if err != nil {
		panic(err.Error())
	}

	log.Println(p1Data.Id)

	return (matchData)
}
