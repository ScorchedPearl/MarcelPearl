import { User, Code, BookOpen, Pencil, Circle, FileCode} from "lucide-react";

const Sidebar = () => {
    return (
        <div className="w-60 p-4 rounded-2xl shadow-md mr-5 border-2 border-gray-700 bg-gradient-to-b from-orange-900 to-brown-800">
            <div className="mb-8">
                <div className="flex items-center gap-4">
                    <img src="https://cdn.creazilla.com/cliparts/3174456/profile-clipart-xl.png" alt="Profile" className="w-12 h-12 rounded-full" />
                    <div>
                        <h3 className="text-lg font-bold">John Doe</h3>
                        <p className="text-sm text-white-600">Full Stack Developer | Tech Enthusiast</p>
                    </div>
                </div>
                <button className="w-50 mt-5 flex items-center justify-center gap-2 bg-orange-800 text-white py-1 px-3 rounded-lg text-sm">
                    <Pencil size={16} /> Edit Profile
                </button>
            </div>
            <hr className="border-gray-300 my-6" />

            <div className="mb-4">
                <h4 className="flex items-center gap-2 text-lg font-semibold mb-2"><Code size={20} /> Languages</h4>
                <ul className="text-md text-white-700 space-y-1">
                    <li className="flex items-center gap-2"><FileCode size={16} className="text-yellow-500" /> JavaScript</li>
                    <li className="flex items-center gap-2"><FileCode size={16} className="text-blue-500" /> Python</li>
                    <li className="flex items-center gap-2"><FileCode size={16} className="text-red-500" /> Java</li>
                    <li className="flex items-center gap-2"><FileCode size={16} className="text-purple-500" /> C++</li>
                </ul>
            </div>
            <hr className="border-gray-300 my-4" />

            <div className="w-full">
                <h4 className="flex items-center gap-2 text-lg font-semibold mb-2"><BookOpen size={20} /> Topics</h4>
                <ul className="text-md text-white-700 space-y-1">
                    <li className="flex items-center gap-2"><Circle size={12} className="text-green-500" /> Easy</li>
                    <ul className="ml-5 flex gap-5">
                        <li className="text-yellow-200">Array</li>
                        <li className="text-yellow-200">Array</li>
                    </ul>
                    <li className="flex items-center gap-2"><Circle size={12} className="text-yellow-500" /> Medium</li>
                    <li className="flex items-center gap-2"><Circle size={12} className="text-red-500" /> Hard</li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
