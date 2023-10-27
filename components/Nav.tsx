"use client";
import Image from "next/image";
import logo from "@public/assets/images/logo.svg";
import Link from "next/link";
import {
  signOut,
  useSession,
  getProviders,
  signIn,
} from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Session } from "next-auth";

type Props = {};
const signOutfunction = () => {
  signOut();
};

async function signInFunc() {
  console.log("sign in attempt");
  signIn();
}

const Nav = (props: Props) => {
  // check if user is in session
  const session = useSession().data;
  //Use states and Use effect
  const [dropdownShown, setDropdownShown] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [providers, setProviders] = useState(null);
  useEffect(() => {
    setUpProviders(setProviders);
  }, []);

  return (
    <nav className="mt-2 px-2 w-full flex flex-row justify-between">
      {/* Logo */}
      <Link id="LOGO" href="/" className="flex flex-row">
        <Image className="h-8 w-8" src={logo} alt="logo" />
        <p className="ml-1 pt-1">Promptopia</p>
      </Link>
      {/* Right side of Nav Pane */}
      {session?.user &&
        navbarComponentRightSignOut(session, dropdownShown, setDropdownShown)}
      {!session?.user && navbarComponentRightSignIn(session as Session)}
    </nav>
  );
};

export default Nav;

async function setUpProviders(setProviders: Dispatch<SetStateAction<any>>) {
  const providersList = await getProviders();
  setProviders(providersList);
}

function navbarComponentRightSignIn(session: Session) {
  return (
    <>
      <button
        onClick={() => signInFunc()}
        className="p-2 border rounded-2xl border-gray-200 bg-orange-600 hover:bg-gray-800 hover:text-orange-500"
      >
        Sign In
      </button>
    </>
  );
}

function navbarComponentRightSignOut(
  session: Session,
  dropdownShown: boolean,
  setDropdownShown: Dispatch<SetStateAction<boolean>>
) {
  return (
    <div className="flex flex-row space-x-0">
      <Link href="/create-prompt">
        <button className="p-2 border rounded-l-2xl border-gray-200 bg-orange-600 hover:bg-gray-800 hover:text-orange-500">
          Create Prompt
        </button>
      </Link>
      <button
        onClick={signOutfunction}
        className="p-2 border rounded-r-2xl border-gray-200 hover:bg-gray-800 hover:text-orange-500"
      >
        Sign Out
      </button>
      <Link href={""} className="flex pl-2">
        <Image
          className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
          width="50"
          height="50"
          src={session?.user.image}
          alt={""}
          onClick={() => {
            setDropdownShown((prev) => !prev);
          }}
        />
      </Link>

      {/* Dropdown section */}
      {dropdownShown && (
        <div className="absolute right-3 top-14 z-10 origin-top-right bg-gray-100 divide-y divide-gray-400 rounded-b-md">
          <div>
            <Link
              href="/profile"
              onClick={() => setDropdownShown(false)}
              className="text-gray-700 block m-2 px-2 py-2 text-sm hover:bg-slate-300"
            >
              Profile
            </Link>
            <Link
              href="/create-prompt"
              onClick={() => setDropdownShown(false)}
              className="text-gray-700 block m-2 px-2 py-2 text-sm hover:bg-slate-300"
            >
              Create Prompt
            </Link>
          </div>
          <div>
            <Link
              href="#"
              onClick={() => {
                setDropdownShown(false);
                signOut();
              }}
              className="text-gray-700 block m-2 px-2 py-2 text-sm hover:bg-slate-300"
            >
              Sign Out
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
