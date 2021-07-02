import { useEffect, useRef, useState } from "react";
import Paho from "paho-mqtt";
import { sendMqttMessage } from "apis/springframework";

const Mqtt = () => {
  //-------------------------------------------------------------  
  //상태 선언
  //-------------------------------------------------------------
  const [connected, setConnected] = useState(false);
  const [subTopic, setSubTopic] = useState("/topic1/#");
  const [prevSubTopic, setPrevSubTopic] = useState("/topic1/#");
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
      [event.target.name] : event.target.value
    });
  };

  //-------------------------------------------------------------
  //버튼 이벤트 처리
  //-------------------------------------------------------------
  let client = useRef(null);
  const connectMqttBroker = () => {
    client.current = new Paho.Client("localhost", 61614, "client-" + new Date().getTime());   //JS로 사용할 때보다 간편해짐
    
    client.current.onConnectionLost = () => {
      console.log("접속 실패");
      setConnected(false);
    };

    client.current.onMessageArrived = (msg) => {
      console.log("메시지 수신");
      var message = JSON.parse(msg.payloadString);
      setContents((content) => content.concat(message.topic + ": " + message.content));
    };

    client.current.connect({onSuccess: () => {
      console.log("접속 성공");
      setConnected(true);
    }});
  };

  const disconnectMqttBroker = () => {
    client.current.disconnect();
  };

  const sendSubTopic = () => {
    client.current.unsubscribe(prevSubTopic);
    client.current.subscribe(subTopic);
    setPrevSubTopic(subTopic);
  };

  const publishTopic = async() => {
    await sendMqttMessage(pubMessage);
  };

  //-------------------------------------------------------------
  //마운트 및 언마운트에 실행할 내용
  //-------------------------------------------------------------
  useEffect(() => {
    connectMqttBroker();
    return (() => {
      disconnectMqttBroker();
    });
  }, []);

  //-------------------------------------------------------------
  //렌더링 내용
  //-------------------------------------------------------------
  return (
    <div className="card">
      <div className="card-header">
        Mqtt
      </div>
      <div className="card-body">
        <div>
          {connected === false?
            <button className="btn btn-info btn-sm" onClick={connectMqttBroker}>MQTT 브로커 접속하기</button>
          :
            <button className="btn btn-info btn-sm" onClick={disconnectMqttBroker}>MQTT 브로커 접속끊기</button>
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
            Content: <input type="text" name="content"value={pubMessage.content} onChange={changePubMessage}/>
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

export default Mqtt;
  
  