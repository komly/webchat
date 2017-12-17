package main

import (
	"github.com/komly/webchat/server"
	"log"
	"net/http"
)

func main() {
	http.Handle("/static/", http.StripPrefix("/static", http.FileServer(http.Dir("static"))))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "static/index.html")
	})

	s := server.New()
	http.HandleFunc("/ws", s.Handle)

	log.Printf("Serve on http://127.0.0.1:3000")
	http.ListenAndServe(":3000", nil)
}
