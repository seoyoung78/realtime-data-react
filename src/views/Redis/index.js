import { sendRedisMessage } from "apis/springframework";
import { useEffect, useRef, useState } from "react";

const Redis = () => {
  //-------------------------------------------------------------  
  //상태 선언
  //-------------------------------------------------------------
  const [connected, setConnected] = useState(false);
  const [subTopic, setSubTopic] = useState("/topic1/#");
  const [pubMessage, setPubMessage] = useState({
    topic: "/topic1/topic2",
    content: "Hello"
  });
  const [contents, setContents] = useState([]);
  
  const changeSubTopic = (event) => {
    setSubTopic(event.target.value);
  };

  const changePubMessage = (event) => {
    setPubMessage({
      ...pubMessage,
      [event.target.name]: event.target.value
    });
  };

  //-------------------------------------------------------------
  //버튼 이벤트 처리
  //-------------------------------------------------------------
  // 렌더링 상관 없이 변수를 유지하기 위해 --> DOM 참조
  // 컴포넌트가 갱신 되더라도 다시 초기화되지 않는 변수로 생성
  let ws = useRef(null);
  const connectWebSocket = () => {
    // 자동 연결하려면 useEffect()에 작성
    ws.current = new WebSocket("ws://localhost:8080/websocket/redis");
    // 접속 연결 시 자동 실행
    ws.current.onopen = () => {
      console.log("접속 성공");
      setConnected(true);

      // 접속 시 자동 수신 설정되도록
      sendSubTopic();
    };

    ws.current.onclose = () => {
      console.log("접속 끊김");
      setConnected(false);
    };

    ws.current.onmessage = (event) => {
      console.log("메시지 수신");
      var json = event.data;
      var message = JSON.parse(json);   //JS 객체로 만듦 {topic:xxx, content:yyy}
      setContents((contents) => contents.concat(message.topic + ": " + message.content));    //성능향상을 위해 함수 사용
    };
  };

  const disconnectWebSocket = () => {
    ws.current.close();
  };

  const sendSubTopic = () => {
    var json = {topic: subTopic};
    var message = JSON.stringify(json);
    ws.current.send(message);
  };

  const publishTopic = async() => {
    await sendRedisMessage(pubMessage);
  };

  //-------------------------------------------------------------
  //마운트 및 언마운트에 실행할 내용
  //-------------------------------------------------------------
  useEffect(() => {
    // 마운트 시 실행
    connectWebSocket();
    return (() => {
      // 언마운트 시 실행
      disconnectWebSocket();
    });
  }, []);

  //-------------------------------------------------------------
  //렌더링 내용
  //-------------------------------------------------------------
  return (
    <div className="card">
      <div className="card-header">
        WebSocket + Redis
      </div>
      <div className="card-body">

        <div>
          {connected === false ?
            <button className="btn btn-info btn-sm" onClick={connectWebSocket}>웹소켓 접속하기</button>
            :
            <button className="btn btn-info btn-sm" onClick={disconnectWebSocket}>웹소켓 접속끊기</button>
          }
        </div>

        <div className="card mt-2">
          <div className="card-header">
            [수신 설정]
          </div>
          <div className="card-body d-flex align-items-center">
            <input type="text" name="subTopic" value={subTopic} onChange={changeSubTopic}/>
            <button className="btn btn-info btn-sm ml-2" onClick={sendSubTopic}>설정(접속시 자동 설정)</button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            [발신]
          </div>
          <div className="card-body d-flex align-items-center">
            Topic: <input type="text" name="topic" value={pubMessage.topic} onChange={changePubMessage}/>
            Content: <input type="text" name="content" value={pubMessage.content} onChange={changePubMessage}/>
            <button className="btn btn-info btn-sm ml-2" onClick={publishTopic}>보내기</button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            [수신 메시지]
          </div>
          <div className="card-body d-flex align-items-center">
            <div>
              {contents.map((content, index) => <div key={index}>{content}</div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Redis;
  
  