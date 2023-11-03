package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	fmt.Println("Připojuji se k DB")
	db, err := sql.Open("mysql", "user:Aa123456@tcp(localhost:3002)/WH")

	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	type Facility struct {
		Login    string `json:"login"`
		Password string `json:"password"`
	}

	insert, err := db.Query("INSERT INTO facilities (login, password, facilityName) VALUES ('Bb','Bb','Bb')")

	if err != nil {
		panic(err.Error())
	}

	defer insert.Close()

	var facility Facility

	err = db.QueryRow("SELECT login, password FROM facilities").Scan(&facility.Login, &facility.Password)

	if err != nil {
		panic(err.Error())
	}

	log.Println(facility.Login, facility.Password)

}
