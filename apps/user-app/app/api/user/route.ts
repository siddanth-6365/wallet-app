import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authoptions } from "../../lib/auth";

export const GET = async () => {
  const session = await getServerSession(authoptions);
  console.log("session: ", session);
  if (session.user) {
    return NextResponse.json(session.user);
  }
  return NextResponse.json({ error: "User not found" }, { status: 403 });
};
