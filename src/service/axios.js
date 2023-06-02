import axios from "axios";

let apiUtils = axios.create({
  baseURL: "http://localhost:8080/flashcard", //서버 업로드 후 주소 변경
  timeout: 360000,
});

export default apiUtils;
