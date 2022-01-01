import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";
export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: "read:user",
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
    }),
    Providers.Kakao({
      clientId: process.env.KAKAO_ID,
      authorizationUrl: "https://kauth.kakao.com/oauth/authorize?response_type=code",
      profileUrl: "https://kapi.kakao.com/v2/user/me",
      scope: "account_email profile_nickname profile_image",
    }),
    Providers.Credentials({
      name: "Custom",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "john@doe.com" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        console.log("credentials");
        const url = "/api/users/signin";
        const response = await axios.post(`${process.env.NEXTAUTH_URL + url}`, {
          email: credentials.email,
          password: credentials.password,
        });
        if (response) {
          console.log("response", response);
          return response.data.user;
        } else {
          return null;
        }
      },
    }),
  ],

  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.SECRET,
  jwt: {
    encryption: true,
  },
  pages: {
    error: "/error",
  },
  database: process.env.MONGO_URL,
  callbacks: {
    async jwt(token, user, account, profile) {
      console.log(token, user, account, profile);
      if (user) {
        token.id = user.email;
      }
      return token;
    },
    async session(session, token) {
      session.user.id = token.id;
      return session;
    },
  },
});
