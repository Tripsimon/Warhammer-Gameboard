package main

//Importy
import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

// Strukty
type match struct {
	Id         int    `json:id`
	Name       string `json:name`
	Round      int    `json:round`
	PlayerOne  int    `json:playerOne`
	PlayerTwo  int    `json:playerTwo`
	FacilityId int    `json:facilityId`
}

type matchPlayer struct {
	Id           int    `json:id`
	Name         string `json:name`
	Faction      int    `json:faction`
	Detachment   int    `json:detachment`
	Role         string `json:role`
	Cp           int    `json:cp`
	VpPrimary1   int    `json:vpPrimary1`
	VpPrimary2   int    `json:vpPrimary2`
	VpPrimary3   int    `json:vpPrimary3`
	VpPrimary4   int    `json:vpPrimary4`
	VpPrimary5   int    `json:vpPrimary5`
	VpSecondary1 int    `json:vpSecondary1`
	VpSecondary2 int    `json:vpSecondary2`
	VpSecondary3 int    `json:vpSecondary3`
	VpSecondary4 int    `json:vpSecondary4`
	VpSecondary5 int    `json:vpSecondary5`
}

type matchDataResponse struct {
	Match match       `json:match`
	P1    matchPlayer `json:p1`
	P2    matchPlayer `json:p2`
}

// Funkce pro vytvoření zápasu
func DBcreateMatch(name string, playerOneName string, playerOneFaction string, playerOneDetachment string, playerTwoName string, playerTwoFaction string, playerTwoDetachment string, facilityId string) {
	log.Println("DB Akce: Tvorba zápasu")
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

	log.Println(facilityId)

	insert, err := db.Query("INSERT INTO matches (name, round, playerOne, playerTwo, facility_id) VALUES (?,1,?,?,?)", name, playerOne, playerTwo, facilityId)

	defer insert.Close()
	log.Println("Herní místnost založena")
}

// Získá seznam zápasů
func DBGetMatches(id string) (result []match) {
	log.Println("Připojuji se k DB")
	db, err := sql.Open("mysql", "user:Aa123456@tcp(localhost:3002)/WH")

	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	query, err := db.Query("SELECT id, name, round, playerOne, playerTwo FROM matches WHERE facility_id = ?", id)

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

// Získá data zápasu na základě jeho ID
func DBGetMatchData(id int) (result matchDataResponse) {
	log.Println("DB Akce: Získání dat zápasu")
	db, err := sql.Open("mysql", "user:Aa123456@tcp(localhost:3002)/WH")

	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	var matchData match
	// Lepsi by bylo asi řešit JOINem ale ja si chtěl zkusit skládání structů

	err = db.QueryRow("SELECT id, name, round, playerOne, playerTwo FROM matches WHERE id = ?", id).Scan(&matchData.Id, &matchData.Name, &matchData.Round, &matchData.PlayerOne, &matchData.PlayerTwo)
	if err != nil {
		panic(err.Error())
	}

	var p1Data matchPlayer
	err = db.QueryRow("SELECT * FROM matchPlayers WHERE id = ?", matchData.PlayerOne).Scan(&p1Data.Id, &p1Data.Name, &p1Data.Faction, &p1Data.Detachment, &p1Data.Role, &p1Data.Cp, &p1Data.VpPrimary1, &p1Data.VpPrimary2, &p1Data.VpPrimary3, &p1Data.VpPrimary4, &p1Data.VpPrimary5, &p1Data.VpSecondary1, &p1Data.VpSecondary2, &p1Data.VpSecondary3, &p1Data.VpSecondary4, &p1Data.VpSecondary5)
	if err != nil {
		panic(err.Error())
	}

	var p2Data matchPlayer
	err = db.QueryRow("SELECT * FROM matchPlayers WHERE id = ?", matchData.PlayerTwo).Scan(&p2Data.Id, &p2Data.Name, &p2Data.Faction, &p2Data.Detachment, &p2Data.Role, &p2Data.Cp, &p2Data.VpPrimary1, &p2Data.VpPrimary2, &p2Data.VpPrimary3, &p2Data.VpPrimary4, &p2Data.VpPrimary5, &p2Data.VpSecondary1, &p2Data.VpSecondary2, &p2Data.VpSecondary3, &p2Data.VpSecondary4, &p2Data.VpSecondary5)
	if err != nil {
		panic(err.Error())
	}

	var res matchDataResponse
	res.Match = matchData
	res.P1 = p1Data
	res.P2 = p2Data
	return (res)
}

// Funkce pro synchronizaci dat z frontendu do DB - Zápas
func DBSyncMatchData(id string, round string) {
	log.Println("DB Akce: Uprava dat zápasu")
	db, err := sql.Open("mysql", "user:Aa123456@tcp(localhost:3002)/WH")

	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	result, err := db.Query("UPDATE matches SET `round` = ? WHERE id = ? ", round, id)

	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
}

// Funkce pro synchronizaci dat z frontendu do DB - Hráč
func DBSyncPlayerData(id string, cp string, VpPrimary1 string, VpPrimary2 string, VpPrimary3 string, VpPrimary4 string, VpPrimary5 string, VpSecondary1 string, VpSecondary2 string, VpSecondary3 string, VpSecondary4 string, VpSecondary5 string) {
	log.Println("DB Akce: Uprava dat hráče")
	db, err := sql.Open("mysql", "user:Aa123456@tcp(localhost:3002)/WH")

	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	result, err := db.Query("UPDATE matchPlayers SET cp = ?, vpPrimary1 = ?, vpPrimary2 = ?, vpPrimary3 = ?, vpPrimary4 = ?, vpPrimary5 = ?,  vpSecondary1 = ?, vpSecondary2 = ?, vpSecondary3 = ?, vpSecondary4 = ?, vpSecondary5 = ? WHERE id = ?", cp, VpPrimary1, VpPrimary2, VpPrimary3, VpPrimary4, VpPrimary5, VpSecondary1, VpSecondary2, VpSecondary3, VpSecondary4, VpSecondary5, id)

	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
}
