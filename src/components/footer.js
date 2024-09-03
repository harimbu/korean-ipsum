import { useState } from 'react';
import { MdCopyright, MdInfo } from 'react-icons/md';

export default function Footer() {
  const [modal, setModal] = useState(false);

  return (
    <footer className='py-10 px-4'>
      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
        <MdCopyright />
        <span>harimbu@gmail.com</span>
        <MdInfo
          onClick={() => setModal(!modal)}
          className="cursor-pointer text-lg"
        />
      </div>

      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-gray-800 p-6 rounded-lg max-w-md mx-auto">
            <div className='flex items-center justify-between border-b'>
              <h3 className="text-lg mb-4 font-bold">문학작품 안내</h3>
              <button
                onClick={() => setModal(!modal)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 text-xs"
              >
                닫기
              </button>
            </div>
            <dl className='text-sm leading-6'>
              <dt className='my-3 font-semibold'>1. 청춘예찬</dt>
              <dd>- 요약정보 : 1929년 발표한 민태원의 수필</dd>
              <dd>- 이용조건 : 만료저작물, 자유이용</dd>
              <dt className='my-3 font-semibold'>2. 메밀꽃 필 무렵</dt>
              <dd>- 요약정보 : 1936년 발표한 이효석의 단편소설</dd>
              <dd>- 이용조건 : 만료저작물, 자유이용</dd>
              <dt className='my-3 font-semibold'>3. 운수 좋은 날</dt>
              <dd>- 요약정보 : 1924년 6월 『개벽』48호에 발표 현진건의 단편소설</dd>
              <dd>- 이용조건 : 만료저작물, 자유이용</dd>
            </dl>
          </div>
        </div>
      )}
    </footer>
  );
}
