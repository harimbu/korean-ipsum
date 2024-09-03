import "./globals.css";
import { Noto_Sans_KR } from 'next/font/google';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin' ], // 한글과 라틴 문자 서브셋을 사용
  weight: ['400', '700'], // 필요에 따라 다른 두께 추가 가능
  display: 'swap', // 폰트 로딩 최적화 옵션
});

export const metadata = {
  title: "한글입숨",
  description: "랜덤 한글 텍스트 생성기 - 고전 문학 작품에서 영감을 받아 랜덤한 문장과 문단을 쉽게 생성해보세요. 학생, 작가, 개발자에게 추천합니다.",
  icons: {icon: "/han.svg"},
  keywords: ['한글입숨', '한숨', '한글로렘'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={notoSansKR.className}>{children}</body>
    </html>
  );
}
