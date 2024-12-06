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

  console.log(data?.articles);

  return (
    <>
      <h1>News Blogs Application</h1>
      <div className="container-fluid">
        <div className="row">
          {data?.articles?.map((article) => (
            <div
              className="col-sm-6 col-md-4 col-lg-3 custom-card"
              key={article.publishedAt}
            >
              <img src={article.urlToImage} width="200px" />
              <div className="card-body">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <p>Written by {article.author}</p>
                <p>
                  Published on{" "}
                  {new Date(article.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
