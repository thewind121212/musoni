package main

import (
	"log"
	"net/http"
)

func healthHandler(w http.ResponseWriter, _ *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"status":"ok"}`))
}

func main() {
	http.HandleFunc("/health", healthHandler)
	log.Println("musoni server on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
