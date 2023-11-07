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

	http.HandleFunc("/facility/createFacility", HandleCreateFacility)
	http.HandleFunc("/facility/getAllFacility", HandleGetAllFacility)

	http.HandleFunc("/hello", hello)
	http.HandleFunc("/headers", headers)

	log.Println("Server naslouchá na portu 3001")
	http.ListenAndServe(":3001", nil)

}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
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
