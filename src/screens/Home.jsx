import { useState } from "react";
import getData from "../api/getData";
import { useEffect } from "react";

const Home = () => {
  const [data, setData] = useState();

  const newsData = async () => {
    const response = await getData();
    setData(response);
  };

  useEffect(() => {
    newsData();
  }, []);

  //   console.log(data?.articles);

  return (
    <>
      <h1>News Blogs Application</h1>
      <div className="container-fluid">
        <div className="row">
          {data?.articles?.map((article) => (
            <div key={article.publishedAt}>
              <h3>{article.author}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
