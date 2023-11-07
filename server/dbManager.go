package main

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

// Typy
type facility struct {
	Id         int    `json:id`
	Login      string `json:login`
	Password   string `json:password`
	ScreenName string `json:screenName`
}

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
