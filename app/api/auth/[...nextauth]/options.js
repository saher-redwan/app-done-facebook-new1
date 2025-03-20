import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "@/models/User";
import bcrypt from "bcrypt";

import { custom } from "openid-client";
// this for slow internet, next-auth sent error, it's by default 3500ms
custom.setHttpOptionsDefaults({
  // timeout: 5000,
  timeout: 10000,
  timeout: 30000,
});

export const options = {
  providers: [
    GoogleProvider({
      profile(profile) {
        // console.log("Profile Google: ", profile);

        let userRole = "Google User";
        // console.log("profile:::::::", profile);

        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_Secret,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        // email: {
        //   label: "email:",
        //   type: "text",
        //   placeholder: "your-email",
        // },
        // password: {
        //   label: "password:",
        //   type: "password",
        //   placeholder: "your-password",
        // },
      },
      async authorize(credentials) {
        // console.log("credentials:::", credentials);
        try {
          const foundUser = await User.findOne({ email: credentials.email })
            .lean()
            .exec();

          if (foundUser) {
            // console.log("User Exists");
            const match = await bcrypt.compare(
              credentials.password,
              foundUser.password
            );

            if (match) {
              // console.log("Good Pass");
              delete foundUser.password;

              foundUser["role"] = "Unverified Email";
              return foundUser;
            }
          }
        } catch (error) {
          // console.log(error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // console.log("token,,", token);
      // if (trigger === "update") {
      //   token.name = user.name;
      // }
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      // console.log("token token", token);
      // console.log("user user", user);
      if (user) {
        token.role = user.role;
        // token.image = user.image;
      }

      if (!token?._id || !token?.image) {
        const infoFromDB = await User.findOne({ email: token.email });
        if (!token?._id) {
          token._id = infoFromDB._id;
        }
        if (!token?.image) {
          token.image = infoFromDB.image;
        }
        // console.log("within infoFromDB... XXX");
      }

      return token;
    },
    async session({ session, token }) {
      // console.log("CCCCCCCC", token);

      if (session?.user) {
        session.user.role = token.role;
      }

      session.user._id = token._id;
      session.user.image = token.image;

      // // console.log("session::::  :::::  :::::", session);
      return session;
    },
    // me
    async signIn({ account, profile }) {
      if (account.provider == "google") {
        // console.log("from GOOGLE Provider::: ", profile);

        const foundUser = await User.findOne({ email: profile.email })
          .lean()
          .exec();

        if (!foundUser) {
          //create(signUp) now user
          const userData = {
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            SignUp_provider: "Google",
          };
          await User.create(userData);
          // // console.log("xxx::::::", xxx);
        } else {
          //continue ragistration
          return true;
        }
      }

      // this return for other providers...
      return true;
    },
    async redirect({ url, baseUrl }) {
      // default baseUrl is NEXTAUTH_URL, but because I need to use it in client side I use NEXT_PUBLIC_
      return `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}`;
    },
  },
  pages: {
    signIn: "/signin",
  },
  // i dont sure with below
  secret: process.env.NEXTAUTH_SECRET,
};
