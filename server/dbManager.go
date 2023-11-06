package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func DBcreateFacility(login string, password string, facilityName string) {
	fmt.Println("Připojuji se k DB")
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

func DBGetFacilities() {
	fmt.Println("Připojuji se k DB")
	db, err := sql.Open("mysql", "user:Aa123456@tcp(localhost:3002)/WH")

	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	var (
		login      string
		password   string
		screenName string
	)

	query, err := db.Query("SELECT * FROM facilities")

	if err != nil {
		panic(err.Error())
	}

	for query.Next() {
		err := query.Scan(&login, &password, &screenName)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(login, password, screenName)
	}

	defer query.Close()

}
