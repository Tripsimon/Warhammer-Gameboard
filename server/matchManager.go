package main

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

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
