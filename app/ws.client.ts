import io from "socket.io-client";

export function connect() {
  const port = process.env.PORT;
  return io(`http://localhost:${port}`);
}

