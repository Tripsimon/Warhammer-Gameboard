package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	   )

func main()  {
	fmt.Println("Preparing to connect to the DB ...")

	db, err = sql.Open("mysql", "user:Aa123456@tcp(localhost:3002)/WH")

	fmt.Println(db)
}

func printStuff(){
		fmt.Println("hello world")
}