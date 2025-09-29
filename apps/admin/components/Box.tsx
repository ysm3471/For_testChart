'use client'

import React, { useEffect, useState } from 'react'
import styled from './Box.module.css' 
import { getDatabase, onValue, ref, query  } from 'firebase/database'
import { app } from '@/Firebase/FirebaseClient';

import {Button} from "@turbotest/ui" 

const numArr = [1,2,3,4,5]  // 버튼 리스트

export default function Box() { 
  const [selected,setSelected] = useState(0) // 클릭한 버튼을 저장하는 state
  const [num,setNum] = useState(0) // 클릭한 버튼의 클릭 횟수를 저장하는 state
 

  function handleClick(data:number) {
    const db = getDatabase(app);  // firebase 연결
    const dataRef = query(ref(db, `user-posts/numCnt/${data}`))   // 클릭한 숫자의 클릭 횟수를 가져옴
    onValue(dataRef, (snapshot) => {
      setNum(snapshot.val() ?? 0)
    });
    setSelected(data)
  }

  const buttons = numArr.map((aa,idx) => {
    return <Button num={aa} key={idx} selected={selected} handleClick={() => {handleClick(aa)}}/>
  })

  return (
    <div className={styled.box}>
      <h2 className={styled.title}><span>Show</span> History</h2>
      <div className={styled.buttonWrap}>
        {selected !== 0 && <h3 data-testid="num">'{selected}' 은(는) {num}번 조회한 버튼입니다.</h3>}
        <div className={styled.buttonBox}>
        {buttons}
        </div>
      </div>
    </div>
  )
}
