package main

import (
	"database/sql"
	"log"
	"strconv"

	_ "github.com/go-sql-driver/mysql"
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

/**
* Autentikace uživatele do systému
**/
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

/**
* Autentikace uživatele do systému
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
