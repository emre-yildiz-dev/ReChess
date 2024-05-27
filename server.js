import { createRequestHandler } from "@remix-run/express";
import { installGlobals } from "@remix-run/node";
import express from "express";
import compression from "compression";
import morgan from "morgan";
import { createServer } from "http";
import { Server } from "socket.io";

installGlobals();
const viteDevServer =
  process.env.NODE_ENV === "production"
    ? undefined
    : await import("vite").then((vite) =>
      vite.createServer({
        server: { middlewareMode: true },
      })
    );

const remixHandler = createRequestHandler({
  build: viteDevServer
    ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build")
    : await import("./build/server/index.js")
});


const app = express();

app.use(compression());
app.disable("x-powered-by");

app.use(
  viteDevServer
    ? viteDevServer.middlewares
    : "/public",
  express.static("build/client/assets", { immutable: true, maxAge: "1y" })
);

app.use(express.static("build/client", { maxAge: "1h" }));
app.use(morgan("tiny"));
app.all("*", remixHandler);

const server = createServer(app);
const io = new Server(server);



io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("event", async (data) => {
    console.log(data);

    let i = 0;
    while (i < 10) {
      const rand = Math.random();
      socket.emit("event", { "Emre": rand.toString() });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      i++;
    }

  });

  socket.on("dispose", () => {
    console.log("A user disconnected");
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


