'use server';

import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import {getIronSession} from "iron-session";

export type SessionData = {
    token: string
}

export async function sessionOptions() {
    return {
        password: process.env.SECRET_COOKIE_PASSWORD || '',
        cookieName: 'exampleCookieName',
        cookieOptions: {
            maxAge: 60 * 60 * 2, // 2h
            secure: process.env.PHASE === 'production',
            domain: process.env.DOMAIN
        }
    }
}

export async function authorize(scope?: string) {
    let scope_param = '';
    if (scope) {
        scope_param = `&scope=${scope}`;
    }
    redirect(`${process.env.KAUTH_HOST}/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code${scope_param}&client_secret=${process.env.CLIENT_SECRET}`);
}

export async function getAccessToken(code: string) {
    const response = await fetch(`${process.env.KAUTH_HOST}/oauth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${process.env.REDIRECT_URI}`,
    });
    const json = await response.json();
    return json?.access_token.toString();
}

export async function setSessionAccessToken(access_token: string) {
    const session = await getIronSession<SessionData>(
        await cookies(),
        await sessionOptions()
    )
    session.token = access_token
    await session.save()
}

export async function getSessionAccessToken() {
    const session = await getIronSession<SessionData>(
        await cookies(),
        await sessionOptions()
    )
    return session.token;
}

export async function profile() {
    const access_token = await getSessionAccessToken();
    const response = await fetch(`${process.env.KAPI_HOST}/v2/user/me`, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });
    return JSON.stringify(await response.json());
}

export async function friends() {
    const access_token = await getSessionAccessToken();
    const response = await fetch(`${process.env.KAPI_HOST}/v1/api/talk/friends`, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });
    return JSON.stringify(await response.json());
}

export async function message() {
    const access_token = await getSessionAccessToken();
    const param = 'template_object={"object_type":"text","text":"Hello, world!","link":{"web_url":"https://developers.kakao.com","mobile_web_url":"https://developers.kakao.com"}}'
    const response = await fetch(`${process.env.KAPI_HOST}/v2/api/talk/memo/default/send`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: param
    });
    return JSON.stringify(await response.json());
}

export async function friends_message(uuids: string) {
    const access_token = await getSessionAccessToken();
    const uuid_param = encodeURIComponent(`${uuids}`);
    const param = `receiver_uuids=[${uuid_param}]&template_object={"object_type":"text","text":"Hello, world!","link":{"web_url":"https://developers.kakao.com","mobile_web_url":"https://developers.kakao.com"}}`
    const response = await fetch(`${process.env.KAPI_HOST}/v1/api/talk/friends/message/default/send`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: param
    });
    return JSON.stringify(await response.json());
}

export async function logout() {
    const access_token = await getSessionAccessToken();
    const response = await fetch(`${process.env.KAPI_HOST}/v1/user/logout`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });
    return JSON.stringify(await response.json());
}

export async function unlink() {
    const access_token = await getSessionAccessToken();
    const response = await fetch(`${process.env.KAPI_HOST}/v1/user/unlink`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });
    return JSON.stringify(await response.json());
}
