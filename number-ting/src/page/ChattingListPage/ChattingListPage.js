import React, { useEffect } from 'react'
import { Socket } from 'socket.io-client'
import io from "socket.io-client";

const socket = io("http:localhost:8080") // 백엔드 주소를 연결할 소켓을 만듦

const ChattingListPage = () => {


  useEffect(() => {
    UserName()
  }, [])

  const UserName = () => {
    const Name = prompt("dd")

    socket.emit("login", Name, (res) => {
      console.log("res", res)
    })
  }
  return (
    <div>
      ChattingListPaged
    </div>
  )
}

export default ChattingListPage
