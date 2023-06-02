import axios from "axios";

let apiUtils = axios.create({
  baseURL: `${process.env.VUE_APP_URL}/flashcard`, //서버 업로드 후 주소 변경
  timeout: 360000,
});

export default apiUtils;
