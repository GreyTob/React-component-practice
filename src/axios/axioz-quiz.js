import axios from 'axios'

//задаю постоянный базовый URL, который можно конфигурировать
export default axios.create({
  baseURL:
    'https://reacr-quiz-33e60-default-rtdb.europe-west1.firebasedatabase.app/',
})
