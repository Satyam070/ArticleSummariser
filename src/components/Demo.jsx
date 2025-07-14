import { useState, useEffect } from "react";
import { auth } from "../firebase";

import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  // RTK lazy query
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  // Load data from localStorage on mount
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const { data } = await getSummary({ articleUrl: article.url });

  if (data?.summary) {
    const newArticle = {
      url: article.url,
      summary: data.summary,
      title: document.title,
      favicon: `${new URL(article.url).origin}/favicon.ico`,
    };

    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to save bookmarks.");
      return;
    }

    const key = `bookmarks_${user.uid}`;
    const existing = JSON.parse(localStorage.getItem(key)) || [];
    const updated = [newArticle, ...existing];

    localStorage.setItem(key, JSON.stringify(updated));
    setArticle(newArticle);
  }
};


  // copy the url and toggle the icon for user feedback
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
  <section className="w-full flex justify-center mt-16 px-4">
    <div className="w-full max-w-xl flex flex-col items-center">

      {/* Search */}
      <form
        className="relative flex w-full justify-center items-center mb-4"
        onSubmit={handleSubmit}
      >
        <img
          src={linkIcon}
          alt="link-icon"
          className="absolute left-3 w-5"
        />

        <input
          type="url"
          placeholder="Paste the article link"
          value={article.url}
          onChange={(e) => setArticle({ ...article, url: e.target.value })}
          onKeyDown={handleKeyDown}
          required
          className="url_input pl-10"
        />
        <button
          type="submit"
          className="submit_btn ml-2"
        >
          <p>↵</p>
        </button>
      </form>

      {/* History */}
      <div className="flex flex-col gap-1 w-full max-h-60 overflow-y-auto mb-6">
        {allArticles.reverse().map((item, index) => (
          <div
            key={`link-${index}`}
            onClick={() => setArticle(item)}
            className="link_card"
          >
            <div className="copy_btn" onClick={() => handleCopy(item.url)}>
              <img
                src={copied === item.url ? tick : copy}
                alt={copied === item.url ? "tick_icon" : "copy_icon"}
                className="w-[40%] h-[40%] object-contain"
              />
            </div>
            <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
              {item.url}
            </p>
          </div>
        ))}
      </div>

      {/* Result */}
      <div className="my-10 w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Well, that was not supposed to happen...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3 w-full">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  </section>
);

};

export default Demo;