import { Outlet } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Socket, connect } from "socket.io-client";
import { Button } from "~/components/ui/button";
import { wsContext } from "~/ws.context";

export default function SocketPage() {
  let [socket, setSocket] = useState<Socket>();
  let [data, setData] = useState<any>({});

  useEffect(() => {
    let connection = connect();
    setSocket(connection);
    return () => {
      connection.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("event", (data) => {
      console.log(data);
      setData(data);
    });
  }, [socket]);

  const handleClick = () => {
    socket?.emit("event", {"MR": "Hello"});
  }

  return (
    <div>
      <wsContext.Provider value={socket}>
        <h1>Socket</h1>
        <p>{socket?.id}</p>
        <p>{JSON.stringify(data)}</p>
        <Button onClick={handleClick}>Click</Button>
        <Button onClick={() => {
          socket?.emit("dispose");
          socket?.close();
        }}>Disconnect</Button>
      </wsContext.Provider>
      <Outlet/>
    </div>
  )
}

