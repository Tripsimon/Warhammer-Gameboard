package main

//Importy
import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

// Strukty
type stratagem struct {
	Id            int    `json:id`
	Detachment_id int    `json:factionId`
	Name          string `json:name`
	Ability       string `json:description`
	Price         int    `json:price`
}

// Funkce pro získání stratagemů pro detachment
func DBGetStratagemsForDetachment(detachmentId string) (result []stratagem) {
	log.Println("Připojuji se k DB")
	db, err := sql.Open("mysql", "user:Aa123456@tcp(localhost:3002)/WH")

	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	query, err := db.Query("SELECT * FROM stratagems WHERE detachment_id = ? OR detachment_id = -1", detachmentId)
	if err != nil {
		panic(err.Error())
	}

	result = []stratagem{}
	for query.Next() {
		var vec stratagem
		err := query.Scan(&vec.Id, &vec.Detachment_id, &vec.Name, &vec.Ability, &vec.Price)
		if err != nil {
			log.Fatal(err)
		}

		result = append(result, vec)
	}
	defer query.Close()

	return result
}
