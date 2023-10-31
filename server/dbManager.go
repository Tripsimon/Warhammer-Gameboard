package main

import (
    "fmt"
    "database/sql"
    _ "github.com/go-sql-driver/mysql"
)

func main(){
	fmt.Println("Připojuji se k DB");
	db, err := sql.Open("mysql", "user:Aa123456@tcp(localhost:3002)/WH");

	if err != nil {
		panic(err.Error())
	}

	defer db.Close()

	insert, err := db.Query("INSERT INTO facilities (login, password, facilityName) VALUES ('Bb','Bb','Bb')")

	if err != nil{
		panic(err.Error())
	}

	defer insert.Close()

}