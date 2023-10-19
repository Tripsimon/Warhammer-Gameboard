package main

import (
    "fmt"
    "net/http"
)

func main() {

    http.HandleFunc("/hello", hello)
    http.HandleFunc("/headers", headers)
    http.HandleFunc("/auth", authentification)

    http.ListenAndServe(":3001", nil)
}

func authentification(w http.ResponseWriter, req *http.Request){
    fmt.Fprintf(w, "1")
}

func hello(w http.ResponseWriter, req *http.Request) {

    fmt.Fprintf(w, "hello\n")
}

func headers(w http.ResponseWriter, req *http.Request) {

    for name, headers := range req.Header {
        for _, h := range headers {
            fmt.Fprintf(w, "%v: %v\n", name, h)
        }
    }
}

