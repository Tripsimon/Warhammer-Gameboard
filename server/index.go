package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
)

func main() {
	log.Println("Server se zapíná")

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello!")
	})

	http.HandleFunc("/loginAutenticate", HandleLoginAuthenticate)

	http.HandleFunc("/facility/createFacility", HandleCreateFacility)
	http.HandleFunc("/facility/getAllFacility", HandleGetAllFacility)
	http.HandleFunc("/facility/deleteFacility", HandleDeleteFacility)
	http.HandleFunc("/facility/checkFacilityLogin", HandleCheckFacilityLogin)

	http.HandleFunc("/faction/createFaction", HandleCreateFaction)
	http.HandleFunc("/facility/getAllFaction", HandleGetAllFaction)

	http.HandleFunc("/hello", hello)
	http.HandleFunc("/headers", headers)

	log.Println("Server naslouchá na portu 3001")
	http.ListenAndServe(":3001", nil)

}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

/**
* Funkce pro obsloužení požadavku na přihlášení
**/
func HandleLoginAuthenticate(res http.ResponseWriter, req *http.Request) {
	enableCors(&res)
	var login = strings.Join(req.URL.Query()["login"], "")
	var password = strings.Join(req.URL.Query()["password"], "")

	result := DBAuthenticateUser(login, password)
	log.Println(result)
	switch result {
	case "User not found":
		fmt.Fprint(res, "NOT FOUND")
		break

	case "Wrong Password":
		fmt.Fprint(res, "WRONG PASSWORD")
		break

	default:

		if len(result) > 0 {
			fmt.Fprint(res, result)
		}

		break
	}

}

// Funkce pro obsloužení požadavku na kontrolu existence loginu v tabulce facilities
func HandleCheckFacilityLogin(w http.ResponseWriter, req *http.Request) {
	enableCors(&w)
	var login = strings.Join(req.URL.Query()["login"], "")
	exists := DBcheckFacilityLogin(login)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]bool{"exists": exists})
}

func HandleGetAllFacility(w http.ResponseWriter, req *http.Request) {
	enableCors(&w)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(DBGetFacilities())
}

func HandleCreateFacility(w http.ResponseWriter, req *http.Request) {
	enableCors(&w)
	var login = strings.Join(req.URL.Query()["login"], "")
	var password = strings.Join(req.URL.Query()["password"], "")
	var screenName = strings.Join(req.URL.Query()["screenName"], "")
	DBcreateFacility(login, password, screenName)
	fmt.Println(w, "SUCCESS")
}

func HandleDeleteFacility(w http.ResponseWriter, req *http.Request) {
	enableCors(&w)

	var id = strings.Join(req.URL.Query()["id"], "")
	DBdeleteFacility(id)
	fmt.Println(w, "SUCCESS")
}

func HandleCreateFaction(w http.ResponseWriter, req *http.Request) {
	enableCors(&w)
	var screenName = strings.Join(req.URL.Query()["screenName"], "")
	var description = strings.Join(req.URL.Query()["description"], "")
	DBcreateFaction(screenName, "null", description)
	fmt.Println(w, "SUCCESS")
}

// Funkce pro dotažení všech frakcí
func HandleGetAllFaction(w http.ResponseWriter, req *http.Request) {
	enableCors(&w)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(DBGetFactions())
}

func hello(w http.ResponseWriter, req *http.Request) {
	enableCors(&w)
	fmt.Fprintf(w, "hello\n")
}

func headers(w http.ResponseWriter, req *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	for name, headers := range req.Header {
		for _, h := range headers {
			fmt.Fprintf(w, "%v: %v\n", name, h)
		}
	}
}
