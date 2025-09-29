import React from "react";
import '@testing-library/dom'
import { render, screen, fireEvent } from '@testing-library/react';
import Button from "./Button";

describe('<Button/>', () => {
  it('버튼 컴포넌트를 클릭하면 이벤트 발생', () => {
    const handleClick = jest.fn();  // 클릭 시 더미함수
    render(<Button num={1} handleClick={handleClick} selected={1} />)

    const button = screen.getByRole('button', { name: '1' })
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalled()  // 클릭하면 함수 호출
    expect(button.getAttribute("class")).toContain("selected")    // selected와 num이 같으면 class 변경
  })
})