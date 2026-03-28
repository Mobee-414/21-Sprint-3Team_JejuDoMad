import { Suspense } from 'react';
import KakaoSignupClient from '@/features/auth/components/signup/KakaoSignupClient';

export default function KakaoSignupPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <KakaoSignupClient />
    </Suspense>
  );
}
