package server

import (
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

var up = websocket.Upgrader{
	ReadBufferSize:  2048,
	WriteBufferSize: 2048,
}

func New() *Server {
	s := &Server{
		conns: make(map[*Conn]struct{}),
	}
	return s
}

type Server struct {
	conns map[*Conn]struct{}
}

func (s *Server) Handle(w http.ResponseWriter, r *http.Request) {
	ws, err := up.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("Upgrade error: %v", err)
		return
	}

	conn := NewConn(s, ws)
	s.conns[conn] = struct{}{}

	log.Printf("New user connected: conns: %d", len(s.conns))
	defer func() {
		conn.Close()
		delete(s.conns, conn)
	}()

	go conn.WriteLoop()
	conn.ReadLoop()
}
