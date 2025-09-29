'use client'

import { app } from '../FirebaseClient';
import { getDatabase, ref, child, push, update } from 'firebase/database'

export default function writeUserData(number) {
  const db = getDatabase(app);  // 앱 연결
  const koreaTime = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' }); // 대한민국 기준 타임스탬프

  const postData = {
    num:number,   // 클릭한 번호
    date:koreaTime  // 클릭한 날짜 및 시간
  };

  const newPostKey = push(child(ref(db), '/user-posts/post/')).key; // 저장할 객체의 키를 받음


  let updates = {};
  updates['/user-posts/post/' + newPostKey] = postData;    // 인자로 받은 postData를 json 형태로 저장함

  update(ref(db), updates);  // user-posts/post에 업데이트
}