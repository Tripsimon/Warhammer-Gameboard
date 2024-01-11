package main

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

type detachment struct {
	Id          int    `json:id`
	FactionId   int    `json:factionId`
	Name        string `json:name`
	Description string `json:description`
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

	query, err := db.Query("SELECT id, faction_id, name, description FROM detachments")

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
