import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { socket } from "../lib/socket";

export function useRealtimeSync() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const onSessionUpdated = () => queryClient.invalidateQueries({ queryKey: ["sessions"] });
    const onNoticeUpdated = () => queryClient.invalidateQueries({ queryKey: ["notices"] });

    socket.on("session:updated", onSessionUpdated);
    socket.on("notice:updated", onNoticeUpdated);

    return () => {
      socket.off("session:updated", onSessionUpdated);
      socket.off("notice:updated", onNoticeUpdated);
    };
  }, [queryClient]);
}
