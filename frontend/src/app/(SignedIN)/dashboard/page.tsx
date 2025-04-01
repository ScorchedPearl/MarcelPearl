"use client"
import { PieChart, Pie, Cell } from "recharts";

const data = [
    { name: "Easy", value: 50, color: "#29b6f6" },
    { name: "Medium", value: 30, color: "#fbc02d" },
    { name: "Hard", value: 20, color: "#e53935" },
];

const solvedQuestions = [
    { name: "Two Sum", link: "#" },
    { name: "Reverse Linked List", link: "#" },
    { name: "Binary Search", link: "#" },
    { name: "Merge Intervals", link: "#" },
];

const badges = [
    { name: "Problem Solver", image: "https://assets.leetcode.com/static_assets/others/lg2550.png" },
    { name: "Algorithm Master", image: "https://assets.leetcode.com/static_assets/others/lg2550.png" },
    { name: "Data Structures Pro", image: "https://assets.leetcode.com/static_assets/others/lg2550.png" },
    { name: "LeetCode Champion", image: "https://assets.leetcode.com/static_assets/others/lg2550.png" },
];

const Dashboard = () => {
    return (
        <div>
            <div className="flex gap-4 mb-4">
                <div className="flex-1 p-6 rounded-2xl shadow-md border-2 border-gray-700 bg-gradient-to-b from-orange-900 to-brown-800 flex flex-col text-white relative">
                    <PieChart width={150} height={150}>
                        <Pie data={data} cx={75} cy={75} innerRadius={50} outerRadius={70} dataKey="value" stroke="none">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                    <h2 className="text-3xl font-bold">129/3505</h2>
                    <p className="text-green-400 font-medium">✔ Solved</p>
                    <p className="text-gray-300 text-sm">19 Attempting</p>
                    
                    <div className="absolute right-4 top-1/3 flex flex-col gap-2 bg-gray-800 p-3 rounded-lg">
                        <div className="flex items-center justify-between w-28 text-blue-400">
                            <span>Easy</span>
                            <span className="text-white">50</span>
                        </div>
                        <div className="flex items-center justify-between w-28 text-yellow-400">
                            <span>Med.</span>
                            <span className="text-white">30</span>
                        </div>
                        <div className="flex items-center justify-between w-28 text-red-400">
                            <span>Hard</span>
                            <span className="text-white">20</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 p-6 rounded-2xl shadow-md border-2 border-gray-700 bg-gradient-to-b from-orange-900 to-brown-800 flex flex-col items-center text-white">
                    <h3 className="text-xl font-semibold mb-4">Badges Earned</h3>
                    <div className="flex gap-4 flex-wrap justify-center">
                        {badges.map((badge, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <img src={badge.image} alt={badge.name} className="w-16 h-16 rounded-lg shadow-md" />
                                <p className="text-sm mt-2">{badge.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="p-6 rounded-2xl shadow-md border-2 border-gray-700 bg-gradient-to-b from-orange-900 to-brown-800">
                <h3 className="text-xl font-semibold text-white mb-3">Solved Questions</h3>
                <ul className="text-white text-md space-y-2">
                    {solvedQuestions.map((question, index) => (
                        <li key={index}>
                            <a href={question.link} className="text-blue-400 hover:underline">
                                {question.name}
                            </a>
                            {index < solvedQuestions.length - 1 && <hr className="border-gray-500 my-2" />}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;