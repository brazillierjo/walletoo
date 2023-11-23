import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Route } from "./src/enums/frontend-routes";

export function middleware(request: NextRequest) {
    const response = NextResponse.redirect(new URL(Route.HOME, request.url));

    response.headers.set("Content-Type", "application/json");

    // TODO : Check if user is logged in. If not, redirect to login page

    return NextResponse.redirect(new URL(Route.HOME, request.url));
}

export const config = {
    matcher: ["/wallet", "/account", "/api/transaction", "/api/user"],
};
