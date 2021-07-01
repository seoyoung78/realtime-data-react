import axios from "axios";

export function sendRedisMessage({topic, content}) {
  return axios.get("http://localhost:8080/sendRedisMessage", {params:{topic, content}});
}

export function sendMqttMessage({topic, content}) {
  return axios.get("http://localhost:8080/sendMqttMessage", {params:{topic, content}});
}

