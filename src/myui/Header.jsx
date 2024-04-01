import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
// import Avatar from "@/components/ui/Avatar";
import Dropdown from "@/components/ui/Dropdown";
export default function Header() {
  const { user } = useSelector((state) => state.auth);
  return (
    <header className="bg-slate-50 bg-opacity-50 backdrop-blur-md fixed top-0 w-full z-50 mb-[100px]">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" // Reduced padding here (changed from p-6 to p-4)
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 text-indigo-600 font-bold">
            BlogMe
          </a>
        </div>
        <div className="flex flex-1 justify-end">
          {user ? (
            <Dropdown />
          ) : (
            <Button className="bg-indigo-600 text-white">
              <Link to="/login">
                Log in
                <span className="ml-2" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
