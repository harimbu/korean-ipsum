// pages/index.js
"use client";

import { useState, useEffect } from 'react';
import Footer from '@/components/footer';
import TextBox from '@/components/textbox';

export default function Home() {
  const [novel, setNovel] = useState('/book1.txt');
  const [paraCount, setParaCount] = useState('3');
  const [wordCount, setWordCount] = useState(100);
  const [sentences, setSentences] = useState([]);
  const [showModal, setShowModal] = useState(false);

  function selectRandomWords(words, n) {
    const selectedWords = [];
    for (let i = 0; i < n; i++) {
      const randomIndex = Math.floor(Math.random() * words.length);
      if (!selectedWords.includes(words[randomIndex])) {
        selectedWords.push(words[randomIndex]);
      }
    }
    return selectedWords;
  }

  async function fetchWord() {
    if (wordCount > 500) {
      setShowModal(true);
      return;
    }

    const res = await fetch(novel);
    const str = await res.text();
    const words = str
      .replace(/[^가-힣\s]/g, '') // 한글을 제외한 모든 부호 제거
      .split(' ')
      .map(word => word.trim());

    const sentences = [];
    for (let i = 0; i < parseInt(paraCount); i++) {
      const selectedWords = selectRandomWords(words.slice(), wordCount);
      const makedSentence = selectedWords.join(' ') + '.';
      sentences.push(makedSentence);
    }
    setSentences(sentences);
  }

  useEffect(() => {
    fetchWord(); // 페이지 로드 시 기본 설정으로 문장 생성
  }, []); // 빈 배열을 의존성으로 설정하여 컴포넌트 최초 렌더링 시만 실행

  return (
    <div className='max-w-screen-xl mx-auto px-4'>
      <header>
        <h1 className='text-4xl text-center py-8'>한글입숨</h1>
      </header>
      
      <div className='flex flex-wrap my-6 space-x-8 justify-center items-center'>
        <div className="flex items-center space-x-2">
          <label htmlFor="novel">작품</label>
          <select
            id="novel"
            value={novel}
            onChange={e => {
              setNovel(e.target.value);
              fetchWord(); // 작품이 변경될 때 문장 재생성
            }}
            className="border border-gray-300 rounded-lg px-2 py-1 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="/book1.txt">청춘예찬</option>
            <option value="/book2.txt">메밀꽃 필 무렵</option>
            <option value="/book3.txt">운수좋은 날</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="wordCount">단어</label>
          <input
            id="wordCount"
            type="number"
            value={wordCount}
            onChange={e => setWordCount(parseInt(e.target.value, 10))}
            className="border border-gray-300 rounded-lg px-2 py-1 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
          />
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="paraCount">문단</label>
          <select
            id="paraCount"
            value={paraCount}
            onChange={e => setParaCount(e.target.value)}
            className="border border-gray-300 rounded-lg px-2 py-1 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
        </div>

        <button
          onClick={() => fetchWord()}
          className="bg-blue-500 text-white px-6 py-2 text-sm rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
        >
          만들기
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <p className="text-lg mb-4">단어수는 최대 <b>500단어</b> 입니다.</p>
            <div className="text-center">
              <button
                onClick={() => setShowModal(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='container mt-6'>
        {sentences.map((item, index) => (
          <TextBox key={index} text={item} />
        ))}
      </div>
      
      <Footer />
    </div>
  );
}
