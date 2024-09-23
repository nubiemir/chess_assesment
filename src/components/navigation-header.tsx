import { memo } from "react";
import ThemeController from "./theme-controller";
import { Link } from "react-router-dom";
import Logo from "./logo";

/**
 * NavigationHeader component represents the top navigation bar of the application.
 * 
 * @returns {JSX.Element} - A JSX element representing the navigation header.
 */
const NavigationHeader = () => {
    return (
        <header className="navbar w-[100vw]">
            <div className="navbar-start">
                <Link to={"/"} className="overflow-y-hidden">
                    <Logo />
                </Link>
            </div>
            <div className="navbar-end px-4">
                <ThemeController />
            </div>
        </header>
    );
};

export default memo(NavigationHeader);
