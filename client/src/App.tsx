import { useEffect, useState } from "react"
import io from "socket.io-client"
const socket = io("http://localhost:5000")

function App() {
  const [msg, setMsg] = useState("")
  const [serverMsg, setServerMsg] = useState([])
  const [room, setRoom] = useState("")
  const [reRender, setRerender] = useState(false)

  const handelSendMsg = (e: any) => {
    e.preventDefault()
    if (msg && room) {
      socket.emit("send_msg", {
        msg: msg,
        room: room
      })
    }
  }

  const joinRoom = (e: any) => {
    e.preventDefault()
    if (room) {
      socket.emit("join_room", {
        room: room
      })
    }
  }


useEffect(() => {
  socket.on("receive_msg", (msg: any) => {
    let maseges: any = serverMsg
    maseges.push(msg)
    setServerMsg(maseges)
    setRerender(!reRender)
  })
}, [socket])

return (
  <div className="App">
    <form onSubmit={(e) => handelSendMsg(e)}>
      <input type="text" onChange={(e) => setMsg(e.target.value)} />
      <button type="submit">send</button>
    </form>

    <form onSubmit={(e) => joinRoom(e)}>
      <input type="text" onChange={(e) => setRoom(e.target.value)} />
      <button type="submit">join room</button>
    </form>

    <h1>msg:</h1>
    {serverMsg.map((msg: string, i: number) => (
      <div key={msg + i}>{msg}</div>
    ))}
  </div>
);
}

export default App;