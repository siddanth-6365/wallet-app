"use client"
// import {useBalance} from "@repo/store/src/hooks/useBalance"
import { signIn, signOut } from "next-auth/react"

export default function Page(): JSX.Element {

  return (
    <div className="text-red-500">
      <div>
        <button onClick={() => signIn()}>Signin</button>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    </div>
  );
}
