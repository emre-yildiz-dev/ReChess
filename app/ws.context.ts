import { createContext } from "react";
import { Socket } from "socket.io-client";

export let wsContext = createContext<Socket | undefined>(undefined);

