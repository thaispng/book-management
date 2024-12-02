import Link from "next/link";
import { usePathname } from "next/navigation";
import { Book, Home, Settings } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <div>
      <div className="text-zinc-800 h-screen w-24 flex flex-col items-center">
        <ul className="flex flex-col justify-center h-full items-center space-y-4">
          <li>
            <Link href="/home" passHref>
              <button
                className={`p-2 flex items-center justify-center w-full rounded-full ${
                  isActive("/home")
                    ? "bg-amber-500 text-white"
                    : "hover:bg-zinc-900"
                }`}
              >
                <Home size={20} />
              </button>
            </Link>
          </li>
          <li>
            <Link href="/books" passHref>
              <button
                className={`p-2 flex items-center justify-center w-full rounded-full ${
                  isActive("/books")
                    ? "bg-amber-500 text-white"
                    : "hover:bg-zinc-900"
                }`}
              >
                <Book size={20} />
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
