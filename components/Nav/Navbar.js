import { signIn, signOut, useSession } from "next-auth/client";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  const [session, loading] = useSession();

  return (
    <div className="bg-black w-full h-[5vh] text-white flex items-center">
      <div className="ml-[2vw] flex space-x-5 items-center ">
        <Link href="/" passHref>
          <button className="w-[3vh] h-[3vh] flex space-x-3">
            <img src="/images/home.png" alt="" />
          </button>
        </Link>
        <div>Welcome To Our Webpage</div>
      </div>
      <div className="ml-auto mr-[5vw]">
        {session ? (
          <div className="flex">
            <div className="capitalize mr-[5vw]">{session.user.name ? session.user.name : session.user.email} </div>
            <button className="underline" onClick={signOut}>
              SIGN-OUT
            </button>
          </div>
        ) : (
          <div className="flex space-x-8">
            <div className="flex space-x-4">
              <div>DONT HAVE ACCOUNT? </div>
              <Link href="/signup" passHref>
                <button className="underline">SIGN-UP</button>
              </Link>
            </div>
            <div>|</div>
            <button className="underline" onClick={signIn}>
              SIGN-IN
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
