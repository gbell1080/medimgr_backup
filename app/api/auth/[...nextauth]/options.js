import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { redirect } from "next/navigation";

const getExistingUsers = async () => {
  const res = await fetch("http://medimgr.vercel.app/api/Users", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }
  return res.json();
};

const existingUsers = await getExistingUsers();
console.log(existingUsers);
const existingEmails = [
  ...new Set(existingUsers?.users.map(({ email }) => email)),
];

export const options = {
  providers: [
    GitHubProvider({
      profile(profile) {
        // console.log(
        //   "GitHub profile: ---------------------------------------------- \n ",
        //   profile
        // );
        var index = existingUsers?.users
          .map((e) => e.email)
          .indexOf(profile.email);
        console.log(
          "GitHub email: ",
          index,
          profile.email,
          existingUsers?.users[index]?.role
        );
        let userRole = "GitHub User";
        if (profile.email === "gbell1080@gmail.com") {
          userRole = existingUsers?.users[index]?.role;
        }
        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      profile(profile) {
        // console.log(
        //   "Google profile: ------------------------------------------------------------------\n ",
        //   profile
        // );

        let userRole = "Google User";

        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user) {
      if (existingEmails.includes(user.user.email)) {
        return true;
      } else {
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
