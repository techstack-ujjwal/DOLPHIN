import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db.js";
import { deviceAuthorization } from "better-auth/plugins/device-authorization";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  basePath: "/api/auth",
  trustedOrigins: ["http://localhost:3000"],
  plugins:[
    deviceAuthorization({
      verificationUri: "/device",
      onVerificationSuccess: async ({ userCode, userId }) => {
        console.log(`Device ${userCode} approved by user ${userId}`);
      }
    })
  ],
  socialProviders:{
    github:{
      clientId: process.env.GITHUB_CLIENT_ID ,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }
  }
});
