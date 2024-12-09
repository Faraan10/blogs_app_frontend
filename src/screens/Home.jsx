import { useState } from "react";
import getData from "../api/getData";
import { useEffect } from "react";
import Spinner from "../components/Spinner";

const Home = () => {
  const [data, setData] = useState();
  const [constData, setConstData] = useState();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [authors, setAuthors] = useState([]);

  const newsData = async () => {
    const response = await getData();
    setLoading(false);
    setData(response);
    setConstData(response);
    const uniqueAuthors = new Set();
    response?.articles.forEach((art) => {
      uniqueAuthors.add(art.author);
    });
    setAuthors([...uniqueAuthors]);
    handleSort("Lastest");
  };

  useEffect(() => {
    newsData();
  }, []);

  const handleSort = (sortOrder) => {
    const sortedData = [...data.articles].sort((a, b) => {
      const dateA = new Date(a.publishedAt);
      const dateB = new Date(b.publishedAt);

      return sortOrder === "Latest" ? dateB - dateA : dateA - dateB;
    });
    setData({ articles: sortedData });
  };

  const filterAuthor = (name) => {
    if (name == "") {
      setData(constData);
    } else {
      setData({
        articles: constData?.articles.filter((data) => data.author == name),
      });
    }
  };

  console.log(data);

  return (
    <>
      <h1 className="header">News Blogs</h1>

      <form className="max-w-md mx-auto form-align">
        <div style={{ display: "flex" }}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
        </div>

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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
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

      <div
        className="filter-buttons"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Old - Recent
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        <div
          id="dropdown"
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li onClick={(e) => handleSort("Oldest")}>
              <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Oldest First
              </a>
            </li>
            <li onClick={(e) => handleSort("Latest")}>
              <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Latest First
              </a>
            </li>
          </ul>
        </div>
        <select
          onChange={(e) => {
            filterAuthor(e.target.value);
          }}
        >
          <option value="">All</option>
          {authors?.map((author, index) => (
            <option key={index} value={author}>
              {author}
            </option>
          ))}
        </select>
      </div><br/><br/><br/>

      <div className="container-fluid">
        <div className="row">
          {loading ? (
            <Spinner />
          ) : (
            data?.articles
              ?.filter((article) => {
                return search.toLowerCase() === ""
                  ? article
                  : article.title.toLowerCase().includes(search);
              })
              .map((article) => (
                <a
                  href={article.url}
                  className="col-sm-6 col-md-4 col-lg-3 custom-card"
                  target="_blank"
                  key={article.title}
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
                </a>
              ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
