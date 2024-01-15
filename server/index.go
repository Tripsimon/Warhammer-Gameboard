package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"golang.org/x/crypto/bcrypt"
)

var jwtManager *JWTManager

func main() {
	log.Println("Server se zapíná")

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello!")
	})

	http.HandleFunc("/loginAutenticate", HandleLoginAuthenticate)

	http.HandleFunc("/matches/createMatch", VerifyTokenMiddleware(HandleCreateMatch, false))
	http.HandleFunc("/matches/getMatches", VerifyTokenMiddleware(HandleGetMatches, false))
	http.HandleFunc("/matches/getMatchData", VerifyTokenMiddleware(HandleGetMatchData, false))
	http.HandleFunc("/matches/syncMatchData", HandleSyncMatchData)
	http.HandleFunc("/matches/syncPlayerData", HandleSyncPlayerData)

	http.HandleFunc("/facility/createFacility", VerifyTokenMiddleware(HandleCreateFacility, true))
	http.HandleFunc("/facility/getAllFacility", VerifyTokenMiddleware(HandleGetAllFacility, true))
	http.HandleFunc("/facility/deleteFacility", VerifyTokenMiddleware(HandleDeleteFacility, true))
	http.HandleFunc("/facility/checkFacilityLogin", VerifyTokenMiddleware(HandleCheckFacilityLogin, true))

	http.HandleFunc("/faction/createFaction", VerifyTokenMiddleware(HandleCreateFaction, true))
	http.HandleFunc("/faction/getAllFaction", VerifyTokenMiddleware(HandleGetAllFaction, false))
	http.HandleFunc("/faction/deleteFaction", VerifyTokenMiddleware(HandleDeleteFaction, true))
	http.HandleFunc("/faction/checkFactionName", VerifyTokenMiddleware(HandleCheckFactionName, true))

	http.HandleFunc("/detachment/createDetachment", VerifyTokenMiddleware(HandleCreateDetachment, true))
	http.HandleFunc("/detachment/getAllDetachment", VerifyTokenMiddleware(HandleGetAllDetachment, false))
	http.HandleFunc("/detachment/deleteDetachment", VerifyTokenMiddleware(HandleDeleteDetachment, true))
	http.HandleFunc("/detachment/checkDetachmentName", VerifyTokenMiddleware(HandleCheckDetachmentName, true))

	http.HandleFunc("/stratagem/getStratagemsForDetachment", HandleGetStratagemsForDetachment)

	http.HandleFunc("/verifyToken", HandleTokenVerification)

	http.HandleFunc("/hello", HandleHelloWorld)
	http.HandleFunc("/headers", headers)

	log.Println("Server naslouchá na portu 3001")
	http.ListenAndServe(":3001", nil)

}

func enableCors(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
}

type TokenVerificationResponse struct {
	Success bool `json:"success"`
	IsAdmin bool `json:"isAdmin"`
}

func HandleTokenVerification(w http.ResponseWriter, req *http.Request) {
	enableCors(w, req)
	switch req.Method {
	case http.MethodOptions:
		fmt.Fprintln(w, http.MethodOptions)
		return
	case http.MethodPost:
		authToken := req.Header.Get("Authorization")
		if authToken == "" {
			http.Error(w, "Unauthorized-missing token", http.StatusUnauthorized)
			return
		}

		claims, err := VerifyToken(authToken[7:])
		if err != nil {
			http.Error(w, "Unauthorized-false token", http.StatusUnauthorized)
			return
		}

		// Odeslat odpověď na klienta
		response := TokenVerificationResponse{
			Success: true,
			IsAdmin: claims["isAdmin"].(bool), // Přidání informace o roli
		}
		jsonResponse, err := json.Marshal(response)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonResponse)

	default:
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
	}
}

/**
* Funkce pro obsloužení požadavku na přihlášení
**/
func HandleLoginAuthenticate(w http.ResponseWriter, req *http.Request) {
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

		result, err := DBAuthenticateUser(login, password)
		if err != nil {
			log.Println(err)
			http.Error(w, "ERROR", http.StatusInternalServerError)
			return
		}

		if result.NotFound {
			jsonResponse, _ := json.Marshal(map[string]bool{"notFound": true})
			w.Header().Set("Content-Type", "application/json")
			w.Write(jsonResponse)
			return
		}

		if result.WrongPassword {
			jsonResponse, _ := json.Marshal(map[string]bool{"wrongPassword": true})
			w.Header().Set("Content-Type", "application/json")
			w.Write(jsonResponse)
			return
		}

		jwtManager := NewJWTManager("your-secret-key", 24*time.Hour)
		token, err := jwtManager.Generate(result.UserID, result.Username, result.IsAdmin)
		if err != nil {
			log.Println(err)
			http.Error(w, "ERROR", http.StatusInternalServerError)
			return
		}

		response := map[string]interface{}{
			"token":    token,
			"userID":   result.UserID,
			"username": result.Username,
			"isAdmin":  result.IsAdmin,
		}

		jsonResponse, err := json.Marshal(response)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonResponse)
	default:
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
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

		var data map[string]interface{}
		err := json.NewDecoder(req.Body).Decode(&data)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		name, _ := data["name"].(string)
		p1, _ := data["p1"].(string)
		p1f, _ := data["p1f"].(string)
		p1d, _ := data["p1d"].(string)
		p2, _ := data["p2"].(string)
		p2f, _ := data["p2f"].(string)
		p2d, _ := data["p2d"].(string)

		DBcreateMatch(name, p1, p1f, p1d, p2, p2f, p2d)

		w.WriteHeader(http.StatusCreated)
		fmt.Fprintln(w, "SUCCESS")
	default:
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
	}
}

func HandleGetMatchData(w http.ResponseWriter, req *http.Request) {
	enableCors(w, req)
	id, _ := strconv.Atoi(strings.Join(req.URL.Query()["id"], ""))
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(DBGetMatchData(id))
}

func HandleGetMatches(w http.ResponseWriter, req *http.Request) {
	enableCors(w, req)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(DBGetMatches())
}

// Uprava dat zápasu
func HandleSyncMatchData(w http.ResponseWriter, req *http.Request) {
	enableCors(w, req)

	var id = strings.Join(req.URL.Query()["id"], "")
	var round = strings.Join(req.URL.Query()["round"], "")
	DBSyncMatchData(id, round)
}

// Uprava dat hrace
func HandleSyncPlayerData(w http.ResponseWriter, req *http.Request) {
	enableCors(w, req)

	var id = strings.Join(req.URL.Query()["id"], "")
	var cp = strings.Join(req.URL.Query()["cp"], "")
	var VpPrimary1 = strings.Join(req.URL.Query()["vp1"], "")
	var VpPrimary2 = strings.Join(req.URL.Query()["vp2"], "")
	var VpPrimary3 = strings.Join(req.URL.Query()["vp3"], "")
	var VpPrimary4 = strings.Join(req.URL.Query()["vp4"], "")
	var VpPrimary5 = strings.Join(req.URL.Query()["vp5"], "")

	var VpSecondary1 = strings.Join(req.URL.Query()["vs1"], "")
	var VpSecondary2 = strings.Join(req.URL.Query()["vs2"], "")
	var VpSecondary3 = strings.Join(req.URL.Query()["vs3"], "")
	var VpSecondary4 = strings.Join(req.URL.Query()["vs4"], "")
	var VpSecondary5 = strings.Join(req.URL.Query()["vs5"], "")

	DBSyncPlayerData(id, cp, VpPrimary1, VpPrimary2, VpPrimary3, VpPrimary4, VpPrimary5, VpSecondary1, VpSecondary2, VpSecondary3, VpSecondary4, VpSecondary5)
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
	w.WriteHeader(http.StatusOK)
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
		w.WriteHeader(http.StatusCreated)
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
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(DBGetFactions())
}

// Funkce pro smazání frakce
func HandleDeleteFaction(w http.ResponseWriter, req *http.Request) {
	enableCors(w, req)
	var id = strings.Join(req.URL.Query()["id"], "")
	DBdeleteFaction(id)
	fmt.Println(w, "SUCCESS")
}

func HandleHelloWorld(w http.ResponseWriter, req *http.Request) {
	enableCors(w, req)
	fmt.Fprintf(w, "Hello World !")
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
		w.WriteHeader(http.StatusCreated)
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
	w.WriteHeader(http.StatusOK)
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

func HandleGetStratagemsForDetachment(w http.ResponseWriter, req *http.Request) {
	enableCors(w, req)

	var detachmentId = strings.Join(req.URL.Query()["detachmentId"], "")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(DBGetStratagemsForDetachment(detachmentId))
}
