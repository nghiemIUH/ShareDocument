import React, {
    createContext,
    FunctionComponent,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import io, { Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);

const SocketProvider: FunctionComponent<{ children: ReactNode }> = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [connection, setConnection] = useState<Socket | null>(null);
    useEffect(() => {
        try {
            const socketConnection = io(
                process.env.REACT_APP_SOCKET_URL as string
            );
            setConnection(socketConnection);
        } catch (err) {
            console.log(err);
        }
    }, []);
    return (
        <SocketContext.Provider value={connection}>
            {children}
        </SocketContext.Provider>
    );
};
export const useSocket = (): Socket | null => {
    const ctx = useContext(SocketContext);
    if (ctx === undefined) {
        throw new Error(
            "useWebsocket can only be used inside WebsocketContext"
        );
    }
    return ctx;
};
export default SocketProvider;
