import "./App.css";
import axios from 'axios'

function App() {

  const getInfo = () => {
    const options = {
      method: "GET",
      url: "https://trivia8.p.rapidapi.com/questions",
      params: { limit: "10", categories: "geography,history,food_and_drink" },
      headers: {
        "X-RapidAPI-Host": "trivia8.p.rapidapi.com",
        "X-RapidAPI-Key": "f3b2f4dd6dmsh2980ca4a7a26448p15bf8ajsnd1da42bd6957",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  getInfo()
}

export default App;
