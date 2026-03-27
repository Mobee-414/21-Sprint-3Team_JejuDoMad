'use client';

import { KAKAO_REDIRECT_URI_SIGNUP } from '@/features/auth/constants/kakao';
import { createKakaoUser } from '@/features/auth/api/signup';
import { AxiosError } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function KakaoSignupClient() {
  const router = useRouter();
  const flagRef = useRef(false);
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (!code) {
      alert('인가 코드가 없습니다. 다시 시도해주세요.');
      router.replace('/signup');
      return;
    }

    if (flagRef.current) return;
    flagRef.current = true;

    const kakaoSignup = async () => {
      try {
        await createKakaoUser({
          nickname: '사용자',
          redirectUri: KAKAO_REDIRECT_URI_SIGNUP,
          token: code,
        });
        router.replace('/login');
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const status = err?.response?.status;
        const message = err?.response?.data?.message;

        console.log('[kakao signup] 에러 status:', status, 'message:', message);

        if (status === 409) {
          alert('이미 등록된 사용자입니다. 로그인 페이지로 이동합니다.');
          router.replace('/login');
          return;
        }
        alert(message || '카카오 회원가입에 실패하였습니다. 다시 시도해주세요.');
        router.replace('/signup');
      }
    };

    kakaoSignup();
  }, [code, router]);

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <div className='w-[40px] h-[40px] animate-spin rounded-full border-8 border-yellow-400 border-t-transparent' />
      <p>카카오 회원가입중...</p>
    </div>
  );
}
