'use client';
import {useState} from "react";
import Image from "next/image";
import {authorize, friends, friends_message, logout, message, profile, unlink} from "@/app/kakao";

export default function Home() {
  const [data, setData] = useState('');
  const [uuid, setUuid] = useState('');
  return (
    <div className="grid items-center justify-items-center gap-5 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p>카카오 로그인 및 프로필 조회 예제</p>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            [KOE101, KOE004] 내 애플리케이션 &gt; 제품 설정 &gt; 카카오 로그인 &gt; 활성화 설정 : ON
          </li>
          <li>
            [KOE006] 내 애플리케이션 &gt; 제품 설정 &gt; 카카오 로그인 &gt; Redirect URI : http://localhost:3000/redirect
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button onClick={() => authorize()}
                  className="flex items-center justify-center text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            <Image
                src={"https://k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"}
                width={222}
                height={49}
                alt="kakao login"
            />
          </button>
          &gt;
          <button onClick={() => authorize('friends,talk_message')}
                  className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          >
            추가 항목 동의 받기 - 친구목록 조회와 메세지 발송 권한 획득
          </button>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <textarea
              className="bg-gray-200 rounded-lg shadow border p-2"
              rows={10}
              cols={80}
              id="contents"
              readOnly={true}
              value={data}
          >
            </textarea>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button onClick={async () => setData(await profile())}
                  className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          >
            사용자 정보 가져오기
          </button>
        </div>
        <ol start={3}
            className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li>
            친구 목록 조회로 UUID 가져와 메시지 보내기 : 친구도 동의 해야 조회 가능
          </li>
        </ol>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button onClick={async () => setData(await friends())}
                  className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          >
            친구 목록 가져오기
          </button>

          <button onClick={async () => setData(await message())}
                  className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          >
            기본 템플릿으로 메시지 보내기 - 나에게 보내기
          </button>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <input onChange={(e) => setUuid(e.target.value)}
                 type="text" value={uuid}
                 placeholder="UUID 입력 ex) &#34;AAA&#34;,&#34;BBB&#34; 쌍따옴표 포함"
                 className="bg-white rounded-lg shadow border p-2 w-80"
          />
          <button onClick={async () => setData(await friends_message(uuid))}
                  className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          >
            기본 템플릿으로 메시지 보내기 - 친구에게 보내기
          </button>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button onClick={async () => setData(await logout())}
                  className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          >
            로그 아웃
          </button>
          <button onClick={async () => setData(await unlink())}
                  className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          >
            연결 끊기
          </button>
        </div>
      </main>
    </div>
  );
}
