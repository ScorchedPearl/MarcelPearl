import { User } from "lucide-react";

const Navbar = () => {
    return (
        <nav className="w-full mb-5 p-4 bg-gradient-to-r from-orange-900 to-brown-800 shadow-md flex justify-between items-center text-white rounded-2xl">
            {/* Logo or Title */}
            <h1 className="text-2xl font-bold pl-4">Dashboard</h1>

            {/* Profile Section */}
            <div className="flex items-center gap-3 pr-4">
                <span className="text-md font-medium">John Doe</span>
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <User size={20} className="text-black" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;