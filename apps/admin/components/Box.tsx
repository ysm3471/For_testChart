'use client'

import React, { useEffect, useState } from 'react'
import styled from './Box.module.css'
import { getDatabase, onValue, ref, query } from 'firebase/database'
import { app } from '@/Firebase/FirebaseClient';

import { Button } from "@turbotest/ui"
import dynamic from 'next/dynamic';
const Plot = dynamic(
  () =>
    import("react-plotly.js"),
  {
    loading: () => <>Loading...</>,
  },
)

const numArr = [1, 2, 3, 4, 5]  // 버튼 리스트


export default function Box() {
  const [selected, setSelected] = useState(0) // 클릭한 버튼을 저장하는 state
  const [num, setNum] = useState(0) // 클릭한 버튼의 클릭 횟수를 저장하는 state
  const [showChart, setShowChart] = useState(false) // 보여줄 방식을 변경하는 state
  const [switchChart, setSwitchChart] = useState(false) // 차트 형태를 변경하는 state
  const [chartData, setChartData] = useState<number[]>([])  // 차트의 데이터를 받아오는 state


  function handleClick(data: number) {
    const db = getDatabase(app);  // firebase 연결
    const dataRef = query(ref(db, `user-posts/numCnt/${data}`))   // 클릭한 숫자의 클릭 횟수를 가져옴
    onValue(dataRef, (snapshot) => {
      setNum(snapshot.val() ?? 0)
    });
    setSelected(data)
  }

  function handleChart() {
    setShowChart(pop => !pop)
    if (!showChart) getData()
  }

  function handleSwitch() {
    setSwitchChart(pop => !pop)
  }

  function getData() {
    const db = getDatabase(app);  // firebase 연결
    const dataRef = query(ref(db, `user-posts/numCnt`))
    let copy: number[] = []
    onValue(dataRef, (snapshot) => {
      copy = [...snapshot.val().slice(1)]
    });
    setChartData(copy)
  }


  const buttons = numArr.map((aa, idx) => {
    return <Button num={aa} key={idx} selected={selected} handleClick={() => { handleClick(aa) }} />
  })

  const charts = switchChart ?
    <Plot
      data={[
        {
          labels: numArr,
          values: chartData,
          type: 'pie',
          textinfo: "label+percent",
          textposition: "outside",
          automargin: true  
        }
      ]}
      layout={{ width: 500, height: 300, title: { text: 'Pie Chart' } }}
      config={{ displayModeBar: false }}
    />
    :
    <Plot
      data={[
        {
          x: numArr,
          y: chartData,
          type: 'bar'
        }
      ]}
      layout={{ width: 500, height: 300, title: { text: 'Bar Chart' } }}
      config={{ displayModeBar: false }}
    />

  return (
    <div className={styled.box}>
      <h2 className={styled.title}><span>Show</span> History</h2>
      <div className={styled.showBtn}>
        <button onClick={handleChart}>{showChart ? "Show Button" : "Show Chart"}</button>
      </div>
      <div className={styled.contents}>
        {showChart ?
          <div className={styled.chartWrap}>
            <button onClick={handleSwitch} className={styled.switchBtn}>{switchChart ? "Bar" : "Pie"}</button>
            {charts}
          </div>
          :
          <div className={styled.buttonWrap}>
            {selected !== 0 && <h3 data-testid="num">'{selected}' 은(는) {num}번 조회한 버튼입니다.</h3>}
            <div className={styled.buttonBox}>
              {buttons}
            </div>
          </div>
        }
      </div>
    </div>
  )
}
