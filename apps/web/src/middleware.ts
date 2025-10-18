import {
	type MiddlewareConfig,
	type NextRequest,
	NextResponse,
} from "next/server";

const publicRoutes = [
	{ path: "/sign-in", whenAuthenticated: "redirect" },
	{ path: "/register", whenAuthenticated: "redirect" },
	{ path: "/forgot-password", whenAuthenticated: "next" },
	{ path: "/images", whenAuthenticated: "next" },
] as const;
const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/sign-in";

export function middleware(request: NextRequest) {
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-url", request.url);

	if (
		request.nextUrl.pathname.startsWith("/images") ||
		request.nextUrl.pathname.startsWith("/_next/static") ||
		request.nextUrl.pathname.startsWith("/_next/image")
	) {
		return NextResponse.next({
			request: {
				headers: requestHeaders,
			},
		});
	}

	const tokenName = "ppx-auth.session-token";
	const path = request.nextUrl.pathname;
	const publicRoute = publicRoutes.find((route) => route.path === path);
	const authToken = request.cookies.get(tokenName);

	if (!authToken && publicRoute) {
		return NextResponse.next({
			request: {
				headers: requestHeaders,
			},
		});
	}

	if (!authToken && !publicRoute) {
		const redirectUrl = request.nextUrl.clone();
		redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
		return NextResponse.redirect(redirectUrl);
	}

	if (
		authToken &&
		publicRoute &&
		publicRoute.whenAuthenticated === "redirect"
	) {
		const redirectUrl = request.nextUrl.clone();
		redirectUrl.pathname = "/";
		return NextResponse.redirect(redirectUrl);
	}

	if (authToken && !publicRoute) {
		return NextResponse.next({
			request: {
				headers: requestHeaders,
			},
		});
	}

	return NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});
}

export const config: MiddlewareConfig = {
	matcher: [
		"/",
		"/costs",
		"/courses",
		"/profile",
		"/statistic",
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
	],
};
