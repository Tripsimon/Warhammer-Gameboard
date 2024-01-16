package main

//Importy
import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// Strukty
type JWTManager struct {
	secretKey     string
	tokenDuration time.Duration
}

func NewJWTManager(secretKey string, tokenDuration time.Duration) *JWTManager {
	return &JWTManager{secretKey, tokenDuration}
}

func (manager *JWTManager) Generate(userID, username string, isAdmin bool) (string, error) {
	claims := jwt.MapClaims{
		"userID":   userID,
		"username": username,
		"isAdmin":  isAdmin,
		"exp":      time.Now().Add(manager.tokenDuration).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(manager.secretKey))
}

// Funkce pro ověření tokenu
func VerifyToken(tokenString string) (jwt.MapClaims, error) {
	jwtManager := NewJWTManager("your-secret-key", 24*time.Hour)
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {

		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(jwtManager.secretKey), nil
	})

	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims, nil
	}

	return nil, fmt.Errorf("Token is not valid")
}

func VerifyTokenMiddleware(next http.HandlerFunc, adminOnly bool) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		if req.Method == "OPTIONS" {
			next.ServeHTTP(w, req)
			return
		}
		enableCors(w, req)
		tokenString := req.Header.Get("Authorization")

		if tokenString == "" {
			http.Error(w, "Authorization header is missing", http.StatusUnauthorized)
			return
		}

		claims, err := VerifyToken(tokenString[7:])
		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		if adminOnly {
			isAdmin, ok := claims["isAdmin"].(bool)
			if !ok || !isAdmin {
				http.Error(w, "Invalid token - admin rights required", http.StatusUnauthorized)
				return
			}
		}

		ctx := context.WithValue(req.Context(), "claims", claims)
		next.ServeHTTP(w, req.WithContext(ctx))
	}
}
