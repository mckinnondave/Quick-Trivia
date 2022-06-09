const axios = require("axios");

const getInfo = (category) => {
  const options = {
    method: "GET",
    url: "https://trivia8.p.rapidapi.com/questions",
    params: { limit: "10", categories: `${category}` },
    headers: {
      "X-RapidAPI-Host": "trivia8.p.rapidapi.com",
      "X-RapidAPI-Key": `${process.env.REACT_APP_API_KEY}`,
    },
  };
  axios
    .request(options)
    .then(function (response) {
      // console.log(response.data);
      return(response.data)
    })
    .catch(function (error) {
      console.error(error);
    });
};

export default getInfo
