import { memo } from "react"
import { Link } from "react-router-dom"


// Home Page Component
const Home = () => {
    return (
        <div className="mt-8">
            <div className="hero">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold truncate">Hello there</h1>
                        <p className="py-6">
                            Join a community where every move matters, and checkmate is just the beginning of your journey. Ready to make your next move?
                        </p>
                        <Link to={"/game"} className="btn btn-primary">New Game</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default memo(Home)