"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { GoSignOut } from "react-icons/go";

import { useEffect } from "react";

function ProfileLayout({ children }) {
  const { data: session } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (!session) router.push("/");
  // }, [session, router]);

  return (
    <>
      <div className=" fixed top-0 z-40 flex justify-center w-screen h-fit bg-gradient-to-b  from-zinc-200 from-0%  via-zinc-200 via-50% to-transparent to-80%">
        <div className="z-50 flex  justify-center lg:justify-between   w-2/3 mt-2 mb-5 top-0">
          <div className="w-32 hidden lg:block">
            <img
              src="/assets/images/memories.png"
              className="object-contain h-32 w-fit "
            />
          </div>

          <div className="flex flex-row lg:items-center gap-2">
            <button className="grad_btn_pink h-7" onClick={() => router.back()}>
              <MdOutlineArrowBackIos />
            </button>

            <h1 className="hidden lg:block text-3xl font-chewy blue_gradient capitalize">
              {" Hi " + session?.user.name.split(" ")[0] + "!"}
            </h1>
            <Image
              src={session?.user.image}
              alt="profile"
              className="rounded-full h-7 w-7 lg:h-10 lg:w-10"
              width={50}
              height={50}
            />
            <button
              type="button h-7"
              onClick={() => {
                signOut;
                router.push("/");
              }}
              className="outline_btn h-7">
              <GoSignOut />
            </button>
            <div>{/* <p>{session?.user.email}</p> */}</div>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
export default ProfileLayout;
