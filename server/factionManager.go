package main

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

type faction struct {
	Id          int    `json:id`
	Name        string `json:name`
	CodeName    string `json:codeName`
	Description string `json:description`
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
