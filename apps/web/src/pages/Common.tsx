import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Common = () => {
    return (
        <div className="w-screen h-screen flex flex-col">
            <Navbar />

            <Outlet />
        </div>
    );
}

export default Common;