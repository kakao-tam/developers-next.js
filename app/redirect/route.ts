import {getAccessToken, setSessionAccessToken} from "@/app/kakao";
import {redirect} from "next/navigation";
import {NextRequest} from "next/server";
export async function GET(req:NextRequest) {
    const code = req.nextUrl.searchParams.get('code') || '';
    const access_token = await getAccessToken(code);
    await setSessionAccessToken(access_token);
    redirect('/');
}

