'use client'

import React, { useState } from 'react'
import styled from './Box.module.css'
import {Button} from "@turbotest/ui" 
import updateViewCnt from '@/Firebase/post/CntData'
import writeUserData from '@/Firebase/post/PostData'

const numArr = [1,2,3,4,5]  // 숫자 리스트

export default function Box() {
  const [num,setNum] = useState(0)  // 클릭한 숫자를 저장하는 state

  function handleClick(data:number) { // 클릭한 숫자를 저장하고 db에 송신하는 함수
    setNum(data)
    writeUserData(data)   // 클릭한 숫자 및 시간 기록 저장
    updateViewCnt(data)   // 클릭한 숫자의 개수 저장
  }

  const buttons = numArr.map((aa,idx) => {
    return <Button num={aa} selected={num} key={idx} handleClick={() => {handleClick(aa)}}/>
  })
  return (
    <div className={styled.box}>
      <h2 className={styled.title}><span>Click</span> Buttons</h2>
      <div className={styled.buttonWrap}>
        {num !== 0 && <h3 data-testid="num">{num}</h3>}
        <div className={styled.buttonBox}>
        {buttons}
        </div>
      </div>
    </div>
  )
}
