package main

import (
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

var up = websocket.Upgrader{
	ReadBufferSize:  2048,
	WriteBufferSize: 2048,
}

var conns = make(map[*websocket.Conn]struct{})

type WSReq struct {
	Type string                 `json:"type"`
	Data map[string]interface{} `json:"data"`
}

func main() {
	http.Handle("/static/", http.StripPrefix("/static", http.FileServer(http.Dir("static"))))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "static/index.html")
	})

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		conn, err := up.Upgrade(w, r, nil)
		if err != nil {
			log.Printf("Upgrade error: %v", err)
			return
		}

		conns[conn] = struct{}{}

		log.Printf("Conns: %d", len(conns))
		defer func() {
			conn.Close()
			delete(conns, conn)
		}()

		for {
			req := WSReq{}

			if err := conn.ReadJSON(&req); err != nil {
				log.Printf("ReadJSON err: %v", err)
				return
			}

			log.Printf("Req: %+v", req)
			if err := conn.WriteJSON(req); err != nil {
				log.Printf("WriteJSON err: %v", err)
				return
			}
		}

	})

	log.Printf("Serve on http://127.0.0.1:3000")
	http.ListenAndServe(":3000", nil)
}
