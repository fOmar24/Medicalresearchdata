import { useState } from "react";
import { ConnectButton } from "@suiet/wallet-kit";
import { Menu, X, Moon, Sun } from "lucide-react";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        localStorage.setItem("theme", !darkMode ? "dark" : "light");
        document.documentElement.classList.toggle("dark", !darkMode);
    };

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <button className="text-2xl font-bold text-indigo-600 dark:text-white">
                    MedChain
                </button>

                {/* Right Section (Connect Button & Dark Mode Toggle) */}
                <div className="flex items-center space-x-4">
                    <ConnectButton />
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                    >
                        {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-md bg-gray-200 dark:bg-gray-800"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 shadow-md">
                    <ul className="py-4 space-y-4 text-center">
                        <li>
                            <button className="block text-gray-700 dark:text-gray-300 hover:text-indigo-500">Home</button>
                        </li>
                        <li>
                            <button className="block text-gray-700 dark:text-gray-300 hover:text-indigo-500">Research Data</button>
                        </li>
                        <li>
                            <button className="block text-gray-700 dark:text-gray-300 hover:text-indigo-500">About</button>
                        </li>
                        <li>
                            <button className="block text-gray-700 dark:text-gray-300 hover:text-indigo-500">Contact</button>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
