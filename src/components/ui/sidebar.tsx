import Link from "next/link";
import { usePathname } from "next/navigation";
import { Book, Home, Settings } from "lucide-react";

export default function Sidebar() {

    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;

    return (
        <div>
            <div className="text-black h-screen w-24 flex flex-col items-center">
                <ul className="flex flex-col justify-center h-full items-center space-y-4">
                    <li>
                        <Link href="/home" passHref>
                            <button
                                className={`p-2 flex items-center justify-center w-full rounded-full ${isActive("/") ? "bg-amber-900 text-white" : "hover:bg-amber-800"
                                    }`}
                            >
                                <Home size={20} />
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link href="/books" passHref>
                            <button
                                className={`p-2 flex items-center justify-center w-full rounded-full ${isActive("/books") ? "bg-amber-900 text-white" : "hover:bg-amber-800"
                                    }`}
                            >
                                <Book size={20} />
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link href="/settings" passHref>
                            <button
                                className={`p-2 flex items-center justify-center w-full rounded-full ${isActive("/settings") ? "bg-amber-900 text-white" : "hover:bg-amber-800 "
                                    }`}
                            >
                                <Settings size={20} />
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
