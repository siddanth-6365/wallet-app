import db from "@repo/db";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

type Credentials = {
  phone: string;
  password: string;
};

export const authoptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "9032806365",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials: Credentials) {
        console.log("hello mf");
        const existingUser = await db.user.findFirst({
          where: { number: credentials.phone },
        });
        console.log("existingUser: ", existingUser);
        if (existingUser) {
          const match = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
          if (match) {
            return { id: existingUser.id, name: existingUser.name };
          } else {
            return { error: "Incorrect password" };
          }
        }
        try {
          const hassedpassword = await bcrypt.hash(credentials.password, 10);
          const newuser = await db.user.create({
            data: {
              number: credentials.phone,
              password: hassedpassword,
            },
          });
          console.log("created user: ", newuser);
          return {
            id: newuser.id.toString(),
            name: newuser.name,
            phone: newuser.number,
          };
        } catch (e) {
          console.error(e);
        }
        return { error: "An error occurred" };
      },
    }),
  ],
  secret: "secret",
  callbacks: {
    async session({ token, session }: any) {
      // console.log("token: ", token);
      session.user.id = token.sub;
      return session;
    },
  },
};
