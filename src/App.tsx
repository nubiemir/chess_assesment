import { RouterProvider } from "react-router-dom"
import ThemeProvider from "./context/theme-context"
import { router } from "./router"


const App = () => {
    return (
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    )
}


export default App