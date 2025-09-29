import React from 'react'; 
import { render, screen, fireEvent, within, getByTestId, queryByTestId } from '@testing-library/react';
import '@testing-library/jest-dom'

import writeUserData from '@/Firebase/post/PostData';
import updateViewCnt from '@/Firebase/post/CntData'; 
import Box from '@/components/Box';

// Firebase 관련 함수 mocking. 실행되지 말아야 하는 테스트는 mocking 처리
jest.mock('@/Firebase/post/PostData', () => ({
  __esModule: true,
  default: jest.fn() // writeUserData
}));

jest.mock('@/Firebase/post/CntData', () => ({
  __esModule: true,
  default: jest.fn() // updateViewCnt
}));

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
    expect(screen.getByRole('heading', { level: 3, name: '1' })).toBeInTheDocument();
  });

  it('버튼 클릭 시 writeUserData와 updateViewCnt가 호출된다', () => {
    render(<Box />);

    const button = screen.getByRole('button', { name: '3' });
    fireEvent.click(button);

    expect(writeUserData).toHaveBeenCalledTimes(1);
    expect(writeUserData).toHaveBeenCalledWith(3);

    expect(updateViewCnt).toHaveBeenCalledTimes(1);
    expect(updateViewCnt).toHaveBeenCalledWith(3);
  });
});