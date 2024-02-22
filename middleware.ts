// https://nextjs.org/docs/app/building-your-application/routing/middleware

export { default } from "next-auth/middleware";

export const config = { matcher: ["/wallet", "/account", "/widgets", "/api"] };
