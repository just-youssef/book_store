import {handleAuth} from "@kinde-oss/kinde-auth-nextjs/server";

// kinde.com auth api
export async function GET(request, {params}) {
	const endpoint = params.kindeAuth;
	return handleAuth(request, endpoint);
}