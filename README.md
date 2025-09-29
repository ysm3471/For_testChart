# Plotly를 활용한 데이터 시각화

#### 기존에 제작한 페이지를 베이스로 관리자 페이지에 기능을 추가하였습니다

#### 사용 기술 : Next.js, Typescript, Github Actions, Turborepo, Firebase, Plotly
#### 테스트 툴 : Jest
<br/>

## 프로젝트 개요
### 페이지 소개 
페이지 주소 - https://for-test-chart-admin.vercel.app
<img width="1920" height="918" alt="chart1" src="https://github.com/user-attachments/assets/b990faee-74b5-4cad-96b2-9d97ab742e17" /><br/><br/> 

* [Client 페이지](https://turborepo-for-test-main-prod.vercel.app/)에서 클릭한 버튼의 횟수를 Firebase에 저장하여 보여줍니다.
* 보여주는 방식은 <b>버튼</b>을 활용한 방식과 <b>차트</b>를 활용한 방식 중에 하나를 선택할 수 있습니다.
* 차트 형태는 <b>Bar</b>와 <b>Pie</b>를 선택할 수 있습니다.

### 핵심 코드 소개

#### 주요 코드 1 - 차트 생성

> Plotly를 활용하여 DB에서 받아온 데이터를 시각화 하였습니다.

```js
  const Plot = dynamic(  // SSR에서 Plotly를 사용하기 위해 dynamic 함수를 사용
    () =>
      import("react-plotly.js"),
    {
      loading: () => <>Loading...</>,
    },
  )

  function handleChart() {  // 차트 생성 여부를 컨트롤하는 함수
    setShowChart(pop => !pop)
    if (!showChart) getData()
  }

  function handleSwitch() {  // 차트 형태를 컨트롤하는 함수
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

  const charts = switchChart ?
    // 파이 차트
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
// 바 차트
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
```
Plotly에서 제공하는 bar와 pie 형태의 그래프를 사용해 기존 데이터를 시각화 하였습니다. <br>
커서 형태를 바꾸거나 일부 UI를 제거하는 등 커스텀하여 원하는 형태로 변경하였습니다.

<img width="1920" height="921" alt="chart2" src="https://github.com/user-attachments/assets/edc2861f-a963-420c-bc27-6540550ad19d" /><br><br>


#### 주요 코드 2 - Jest를 활용한 테스팅 코드 추가

> 기존 테스트 코드를 베이스로 새로운 기능을 테스트 하기 위한 코드를 추가로 작성하였습니다.<br>
> 새롭게 추가한 테스트 코드와 기존 테스트 코드를 전부 통과하는 것을 확인 후 배포 진행하였습니다.

```js
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
```
dynamic으로 import하는 라이브러리의 경우 테스트 진행 시에는 불러오지 않기 때문에 mocking하여 사용하였습니다.

<img width="1089" height="710" alt="chart3" src="https://github.com/user-attachments/assets/e96afba3-7086-4138-a294-e221cc3404e3" /><br>


### 작업 후기
Plotly를 사용하여 데이터 시각화를 활용한 페이지를 제작해보았습니다.<br>
DB 데이터를 가장 한 눈에 효과적으로 보여주기 위하여 Bar 형태와 Pie 형태를 채택하였습니다<br>
Plotly는 Docs의 정리가 잘 되어있어서 사용하기에 편했습니다.<br>
다음에는 D3.js를 사용하여 페이지를 제작하고 둘을 비교해보면 좋을 것 같습니다.
