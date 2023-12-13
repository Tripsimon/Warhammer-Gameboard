package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"

	"golang.org/x/crypto/bcrypt"
)

func main() {
	log.Println("Server se zapíná")

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello!")
	})

	http.HandleFunc("/loginAutenticate", HandleLoginAuthenticate)

	http.HandleFunc("/matches/createMatch", HandleCreateMatch)
	http.HandleFunc("/matches/getMatches", HandleGetMatches)
	http.HandleFunc("/matches/getMatchData", HandleGetMatchData)

	http.HandleFunc("/facility/createFacility", HandleCreateFacility)
	http.HandleFunc("/facility/getAllFacility", HandleGetAllFacility)
	http.HandleFunc("/facility/deleteFacility", HandleDeleteFacility)
	http.HandleFunc("/facility/checkFacilityLogin", HandleCheckFacilityLogin)

	http.HandleFunc("/faction/createFaction", HandleCreateFaction)
	http.HandleFunc("/faction/getAllFaction", HandleGetAllFaction)
	http.HandleFunc("/faction/deleteFaction", HandleDeleteFaction)
	http.HandleFunc("/faction/checkFactionName", HandleCheckFactionName)

	http.HandleFunc("/detachment/createDetachment", HandleCreateDetachment)
	http.HandleFunc("/detachment/getAllDetachment", HandleGetAllDetachment)
	http.HandleFunc("/detachment/deleteDetachment", HandleDeleteDetachment)
	http.HandleFunc("/detachment/checkDetachmentName", HandleCheckDetachmentName)

	http.HandleFunc("/hello", hello)
	http.HandleFunc("/headers", headers)

	log.Println("Server naslouchá na portu 3001")
	http.ListenAndServe(":3001", nil)

}

func enableCors(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
}

/**
* Funkce pro obsloužení požadavku na přihlášení
**/
func HandleLoginAuthenticate(res http.ResponseWriter, req *http.Request) {
	enableCors(res, req)
	var login = strings.Join(req.URL.Query()["login"], "")
	var password = strings.Join(req.URL.Query()["password"], "")

	userID, err := DBAuthenticateUser(login, password)
	if err != nil {
		log.Println(err)
		fmt.Fprint(res, "ERROR")
		return
	}

	log.Println(userID)
	switch userID {
	case "User not found":
		fmt.Fprint(res, "NOT FOUND")
		break

	case "Wrong Password":
		fmt.Fprint(res, "WRONG PASSWORD")
		break

	default:
		if len(userID) > 0 {
			fmt.Fprint(res, userID)
		}
		break
	}
}

// Funkce pro obsloužení požadavku pro založení nové hry
func HandleCreateMatch(w http.ResponseWriter, req *http.Request) {
	enableCors(w, req)
	switch req.Method {
	case http.MethodOptions:
		fmt.Fprintln(w, http.MethodOptions)
		return
	case http.MethodPost:
		name := strings.Join(req.URL.Query()["name"], "")

		p1 := strings.Join(req.URL.Query()["p1"], "")
		p1f, _ := strconv.Atoi(strings.Join(req.URL.Query()["p1f"], ""))
		p1d, _ := strconv.Atoi(strings.Join(req.URL.Query()["p1d"], ""))

		p2 := strings.Join(req.URL.Query()["p2"], "")
		p2f, _ := strconv.Atoi(strings.Join(req.URL.Query()["p2f"], ""))
		p2d, _ := strconv.Atoi(strings.Join(req.URL.Query()["p2d"], ""))

		DBcreateMatch(name, p1, p1f, p1d, p2, p2f, p2d)
		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "SUCCESS")
	default:
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
	}
}

func HandleGetMatches(w http.ResponseWriter, req *http.Request) {
	enableCors(w, req)
	id, _ := strconv.Atoi(strings.Join(req.URL.Query()["id"], ""))
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(DBGetMatchData(id))
}

func HandleGetMatchData(w http.ResponseWriter, req *http.Request) {
	enableCors(w, req)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(DBGetMatches())
}

// Funkce pro obsloužení požadavku na kontrolu existence loginu v tabulce facilities
func HandleCheckFacilityLogin(w http.ResponseWriter, req *http.Request) {
	enableCors(w, req)
	var login = strings.Join(req.URL.Query()["login"], "")
	exists := DBcheckFacilityLogin(login)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]bool{"exists": exists})
}

// Funkce pro dotažení všech heren
func HandleGetAllFacility(w http.ResponseWriter, req *http.Request) {
	enableCors(w, req)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(DBGetFacilities())
}

// Funkce pro vytoření herny
func HandleCreateFacility(w http.ResponseWriter, req *http.Request) {
	enableCors(w, req)
	switch req.Method {
	case http.MethodOptions:
		return
	case http.MethodPost:
		var data map[string]string
		err := json.NewDecoder(req.Body).Decode(&data)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		login := data["login"]
		password := data["password"]
		screenName := data["screenName"]
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), 10)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		DBcreateFacility(login, string(hashedPassword), screenName)
		w.WriteHeader(http.StatusCreated)
		fmt.Fprintln(w, "SUCCESS")
	default:
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
	}
}

// Funkce pro smazání herny
func HandleDeleteFacility(w http.ResponseWriter, req *http.Request) {
	enableCors(w, req)
	var id = strings.Join(req.URL.Query()["id"], "")
	DBdeleteFacility(id)
	fmt.Println(w, "SUCCESS")
}

// Funkce pro obsloužení požadavku na kontrolu existence jména frakce v tabulce frakcí
func HandleCheckFactionName(w http.ResponseWriter, req *http.Request) {
	enableCors(w, req)
	var screenName = strings.Join(req.URL.Query()["screenName"], "")
	exists := DBcheckFactionName(screenName)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]bool{"exists": exists})
}

// Funkce pro vytvoření frakce
func HandleCreateFaction(w http.ResponseWriter, req *http.Request) {
	enableCors(w, req)
	switch req.Method {
	case http.MethodOptions:
		w.WriteHeader(http.StatusOK)
		return
	case http.MethodPost:
		var data map[string]string
		err := json.NewDecoder(req.Body).Decode(&data)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		screenName := data["screenName"]
		codeName := data["codeName"]
		description := data["description"]
		DBcreateFaction(screenName, codeName, description)
		fmt.Fprintln(w, "SUCCESS")
	default:
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
	}
}

// Funkce pro dotažení všech frakcí
func HandleGetAllFaction(w http.ResponseWriter, req *http.Request) {
	enableCors(w, req)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(DBGetFactions())
}

// Funkce pro smazání frakce
func HandleDeleteFaction(w http.ResponseWriter, req *http.Request) {
	enableCors(w, req)
	var id = strings.Join(req.URL.Query()["id"], "")
	DBdeleteFaction(id)
	fmt.Println(w, "SUCCESS")
}

func hello(w http.ResponseWriter, req *http.Request) {
	enableCors(w, req)
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

// Funkce pro vytvoření detachmentu
func HandleCreateDetachment(w http.ResponseWriter, req *http.Request) {
	enableCors(w, req)
	switch req.Method {
	case http.MethodOptions:
		w.WriteHeader(http.StatusOK)
		return
	case http.MethodPost:
		var data map[string]string
		err := json.NewDecoder(req.Body).Decode(&data)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		factionId := data["factionId"]
		detachmentName := data["detachmentName"]
		description := data["description"]
		DBcreateDetachment(factionId, detachmentName, description)
		fmt.Fprintln(w, "SUCCESS")
	default:
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
	}
}

// Funkce pro dotažení všech detachmentů
func HandleGetAllDetachment(w http.ResponseWriter, req *http.Request) {
	enableCors(w, req)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(DBGetDetachments())
}

// Funkce pro smazání detachmentu
func HandleDeleteDetachment(w http.ResponseWriter, req *http.Request) {
	enableCors(w, req)
	var id = strings.Join(req.URL.Query()["id"], "")
	DBdeleteDetachment(id)
	fmt.Println(w, "SUCCESS")
}

// Funkce pro obsloužení požadavku na kontrolu existence jména detachmentu v tabulce detachmentuů
func HandleCheckDetachmentName(w http.ResponseWriter, req *http.Request) {
	enableCors(w, req)
	var detachmentName = strings.Join(req.URL.Query()["detachmentName"], "")
	exists := DBcheckDetachmentName(detachmentName)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]bool{"exists": exists})
}
