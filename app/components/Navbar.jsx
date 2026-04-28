import Link from "next/link";
import { LuWarehouse, LuLogIn } from "react-icons/lu";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm mx-auto items-center">
      <div className="navbar-start flex-1">
        <LuWarehouse />
        <Link href="/" className="btn btn-ghost text-xl">
          Recipe Book
        </Link>
      </div>
      <div className="navbar-center flex-1">
        <Link href="/recipes" className="btn btn-ghost text-xl">
          Recipes
        </Link>
      </div>
      {/* <div className="navbar-end flex-none"> */}
      {/* <div className="avatar avatar-placeholder"> */}
      {/* </div> */}
    </div>
  );
}
