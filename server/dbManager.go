package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

/*
func main() {




	DBcreateFacility("Jmeno","Heslo","ScreenJmeno")



	type Facility struct {
		Login    string `json:"login"`
		Password string `json:"password"`
	}



	var facility Facility

	err = db.QueryRow("SELECT login, password FROM facilities").Scan(&facility.Login, &facility.Password)

	if err != nil {
		panic(err.Error())
	}

	log.Println(facility.Login, facility.Password)


}
*/

func DBcreateFacility(login string, password string, facilityName string) {

	fmt.Println("Připojuji se k DB")
	db, err := sql.Open("mysql", "user:Aa123456@tcp(localhost:3002)/WH")

	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	insert, err := db.Query("INSERT INTO facilities (login, password, facilityName) VALUES ('" + login + "','" + password + "','" + facilityName + "')")

	if err != nil {
		panic(err.Error())
	}

	defer insert.Close()

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
