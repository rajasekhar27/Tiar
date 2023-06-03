import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  pages: {
    signIn: "/",
  },

  providers: [
    CredentialProvider({
      id: "otp-login",
      name: "OtpProvider",

      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "Enter your email ID",
        },
        otp: {
          label: "otp",
          type: "number",
          placeholder: "Enter your otp",
        },
      },

      authorize: async (credentials) => {
        if (credentials.signup) {
          const backendData = JSON.parse(credentials.signup);
          if (backendData["phone"]) {
            backendData.phone_number = Number(backendData.phone);
            console.log("PHone: ", backendData.phone, typeof backendData.phone);
          }

          console.log("BS: ", backendData);

          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}${process.env.NEXT_PUBLIC_ACCOUNTS_CLIENT}user-creation-email/`,
              backendData
            );

            const user = response.data;

            if (user) {
              return user;
            } else {
              return null;
            }
          } catch (err) {
            console.log("error @authorize", err.response.data);
            throw new Error(JSON.stringify(err.response.data));

            // return err.response.data;
          }
        }

        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}accounts/api/client/v1/user-email-otp-login/`,
            {
              email: credentials.email,
              otp: credentials.otp,
            }
          );

          const user = response.data;

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (err) {
          console.log("error @authorize", err.response.data);
          throw new Error(JSON.stringify(err.response.data));
        }
      },
    }),
  ],

  secret: process.env.SECRET,

  jwt: {
    secret: process.env.SECRET,
  },
  session: {
    strategy: "jwt",
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.access;
        token.refreshToken = user.refresh;
        token.user = user;
      }

      return token;
    },

    session: async ({ session, token, user }) => {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = token.user;

      return session;
    },
  },

  debug: true,
});
