import axios from "axios";

const getData = async () => {
  const response = await axios({
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: "http://localhost:5002/api/news",
  });
  return response.data;
};

export default getData;
