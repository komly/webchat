package server

import (
	"encoding/json"
	"github.com/gorilla/websocket"
	"log"
)

const MSG_TYPE_SEND_MESSAGE = "SEND_MESSAGE"

func NewConn(server *Server, ws *websocket.Conn) *Conn {
	return &Conn{
		ws:     ws,
		out:    make(chan interface{}, 100),
		server: server,
	}
}

type Conn struct {
	server *Server
	ws     *websocket.Conn
	out    chan interface{}
}

type WSReq struct {
	Type string          `json:"type"`
	Data json.RawMessage `json:"data"`
}

type WSReqNewMessage struct {
	Text string `json:"text"`
}

type WSNewMessageResp struct {
	Type string            `json:"type"`
	Data *WSNewMessageData `json:"data"`
}

type WSNewMessageData struct {
	Text string `json:"text"`
}

func (c *Conn) Close() {
	c.ws.Close()
}

func (c *Conn) Send(msg interface{}) {
	select {
	case c.out <- msg:
	default:
		log.Printf("Overflow")
		c.Close()
	}
}

func (c *Conn) ReadLoop() {
	for {
		req := WSReq{}

		if err := c.ws.ReadJSON(&req); err != nil {
			log.Printf("ReadJSON err: %v", err)
			return
		}
		switch req.Type {
		case MSG_TYPE_SEND_MESSAGE:
			data := WSReqNewMessage{}
			if err := json.Unmarshal(req.Data, &data); err != nil {
				log.Printf("json.Unmarshal error: %v", err)
				return
			}
			for conn := range c.server.conns {
				conn.Send(&WSNewMessageResp{
					Type: "NEW_MESSAGE",
					Data: &WSNewMessageData{
						Text: data.Text,
					},
				})
			}
			break
		default:
			log.Printf("Invalid message type: %s", req.Type)
			return
		}

	}
}

func (c *Conn) WriteLoop() {
	log.Printf("WriteLoop started")
	for msg := range c.out {
		if err := c.ws.WriteJSON(msg); err != nil {
			log.Printf("WriteJSON error: %v", err)
			return
		}
	}
}
