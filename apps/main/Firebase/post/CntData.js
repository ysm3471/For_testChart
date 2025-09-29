import { getDatabase, ref, runTransaction} from 'firebase/database'
import { app } from '@/Firebase/FirebaseClient';

export default function updateViewCnt(num) {
  const db = getDatabase(app);  // 앱 연결
  const viewcntRef = ref(db, `user-posts/numCnt/${num}`);

  // runTransaction은 콜백에 현재 값을 넘겨주고, 그 값을 어떻게 바꿀지 정의할 수 있음
  runTransaction(viewcntRef, (currentValue) => {
    return (currentValue || 0) + 1 // 기존 값 없으면 0에서 시작
  });
}