import axios from "axios";

// 서버측으로 비동기 요청 처리
export function sendRedisMessage({topic, content}) {
  return axios.get("http://localhost:8080/sendRedisMessage", {params:{topic, content}});
}

export function sendMqttMessage({topic, content}) {
  return axios.get("http://localhost:8080/sendMqttMessage", {params:{topic, content}});
}

