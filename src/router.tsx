import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Game from "./pages/game/index";
import Layout from "./components/layout";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "game",
                element: <Game />
            }
        ]
    }
])
