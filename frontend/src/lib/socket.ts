import { io } from "socket.io-client";
import { USE_MOCK_DATA } from "./api";

export const socket = io(import.meta.env.VITE_SOCKET_URL, {
  autoConnect: !USE_MOCK_DATA,
});
