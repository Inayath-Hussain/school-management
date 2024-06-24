import { Link } from "react-router-dom";
import { routes } from "../routes";

const Navbar = () => {

    const links = [
        { to: routes.class.index, text: "Class" },
        { to: routes.student.index, text: "Student" },
        { to: routes.teacher.index, text: "Teacher" }
    ]

    return (
        <div className="w-screen py-5 flex flex-row justify-around items-center border-b-[1px] border-b-black">
            <h1 className="text-3xl font-semibold">Aican School</h1>

            <div className="flex flex-row gap-10 text-xl">
                {links.map(l => (
                    <Link key={l.text} to={l.to}
                        className="hover:underline cursor-pointer">{l.text}</Link>
                ))}
            </div>
        </div>
    );
}

export default Navbar;