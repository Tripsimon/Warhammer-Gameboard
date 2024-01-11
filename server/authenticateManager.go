package main

import (
	"database/sql"
	"log"
	"strconv"

	_ "github.com/go-sql-driver/mysql"
	"golang.org/x/crypto/bcrypt"
)

// Typy
type AuthenticationResult struct {
	UserID        string
	Username      string
	IsAdmin       bool
	NotFound      bool
	WrongPassword bool
}

func DBAuthenticateUser(login string, password string) (result AuthenticationResult, err error) {
	log.Println("Připojuji se k DB")
	db, err := sql.Open("mysql", "user:Aa123456@tcp(localhost:3002)/WH")

	if err != nil {
		return AuthenticationResult{}, err
	}
	defer db.Close()

	var storedHashedPassword string
	var Id int
	var query string

	if login == "admin" {
		query = "SELECT id, key1, value1 FROM settings WHERE key1=?"
		result.IsAdmin = true
	} else {
		query = "SELECT id, login, password FROM facilities WHERE login=?"
		result.IsAdmin = false
	}

	row := db.QueryRow(query, login)
	if err := row.Scan(&Id, &result.Username, &storedHashedPassword); err != nil {
		if err == sql.ErrNoRows {
			result.NotFound = true
			return result, nil
		}
		return AuthenticationResult{}, err
	}

	err = bcrypt.CompareHashAndPassword([]byte(storedHashedPassword), []byte(password))
	if err != nil {
		if err == bcrypt.ErrMismatchedHashAndPassword {
			result.WrongPassword = true
			return result, nil
		}
		return AuthenticationResult{}, err
	}

	result.UserID = strconv.Itoa(Id)
	return result, nil
}
