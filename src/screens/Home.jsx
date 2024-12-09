import { useState } from "react";
import getData from "../api/getData";
import { useEffect } from "react";

const Home = () => {
  const [data, setData] = useState();
  const [search, setSearch] = useState("");

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
      <h1 className="header">News Blogs</h1>

      <form className="max-w-md mx-auto form-align">
        <label
          for="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="  Search Blogs"
            required
            onChange={(e) => setSearch(e.target.value)}
            style={{ fontSize: "20px" }}
          />
        </div>
      </form>

      <div className="container-fluid">
        <div className="row">
          {data?.articles
            ?.filter((article) => {
              return search.toLowerCase() === ""
                ? article
                : article.title.toLowerCase().includes(search);
            })
            .map((article) => (
              <div
                className="col-sm-6 col-md-4 col-lg-3 custom-card"
                key={article.publishedAt}
              >
                <img src={article.urlToImage} className="article-image" />
                <div className="card-body">
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-description">{article.description}</p>
                  <p className="article-author">
                    Written by{" "}
                    <span className="article-author-span">
                      {article.author}
                    </span>
                  </p>
                  <p className="article-date">
                    Published on{" "}
                    <span className="article-date-span">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
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
