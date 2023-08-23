import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const user = await saveUser(password, email, name);

    return NextResponse.json(user);
  } catch (err: any) {
    console.error(err, "REGISTRATION ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}

const saveUser = async (password: string, email: string, name: string) => {
  const hashedPassword = await bcrypt.hash(password, 12);

  return await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });
};
