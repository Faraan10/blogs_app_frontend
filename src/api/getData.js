import axios from "axios";

const getData = async () => {
  const response = await axios({
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: "https://blogs-backend-1-i2ur.onrender.com/api/news",
  });
  return response.data;
};

export default getData;
