import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import Box from '@/components/Box';
import { getDatabase, onValue, query, ref } from 'firebase/database';

jest.mock("firebase/database");
jest.mock('next/dynamic', () => (importFn: any) => {
  const Comp = () => <div>test</div>;
  return Comp;
});  // 테스트 환경에서는 dynamic import가 동작하지 않아서 mocking 처리 

describe('<Box />', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // 각 테스트 전에 mock 초기화
  });

  it('버튼 클릭 시 숫자가 화면에 표시된다', () => {
    render(<Box />);

    // 초기에는 num 박스 없음 
    expect(screen.queryByTestId('num')).toBeNull();

    const button = screen.getByRole('button', { name: '1' });
    fireEvent.click(button);

    // 클릭 후 h3에 숫자가 표시됨
    expect(screen.getByRole('heading', { level: 3, name: "'1' 은(는) 0번 조회한 버튼입니다." })).toBeInTheDocument();
  });

  it('버튼 클릭 시 firebase 함수들이 호출된다', () => {
    render(<Box />);

    const button = screen.getByRole('button', { name: '3' });
    fireEvent.click(button);

    expect(getDatabase).toHaveBeenCalled(); // db 호출
    expect(ref).toHaveBeenCalledWith("mockDb", "user-posts/numCnt/3");  // ref 호출
    expect(query).toHaveBeenCalled();  // query 전송
    expect(onValue).toHaveBeenCalled(); // db값 저장
  });

  it('버튼 클릭 시 데이터를 불러온다', async () => {
    render(<Box />);

    const button = screen.getByRole('button', { name: 'Show Chart' });
    fireEvent.click(button);

    expect(getDatabase).toHaveBeenCalled(); // db 호출
    expect(ref).toHaveBeenCalledWith("mockDb", "user-posts/numCnt");  // ref 호출
    expect(query).toHaveBeenCalled();  // query 전송
    expect(onValue).toHaveBeenCalled(); // db값 저장
  });
});