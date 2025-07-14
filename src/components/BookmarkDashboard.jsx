import { useEffect, useState } from "react";
import { auth } from "../firebase";

const BookmarkDashboard = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const saved = localStorage.getItem(`bookmarks_${user.uid}`);
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);

  const handleDelete = (index) => {
    const updated = bookmarks.filter((_, i) => i !== index);
    setBookmarks(updated);
    const user = auth.currentUser;
    localStorage.setItem(`bookmarks_${user.uid}`, JSON.stringify(updated));
  };

  return (
    <section className="w-full flex justify-center mt-16 px-4">
      <div className="w-full max-w-xl flex flex-col items-center">
        <h2 className="font-satoshi font-bold text-gray-600 text-2xl mb-6 text-center">
          Saved <span className="orange_gradient">Bookmarks</span>
        </h2>

        {bookmarks.length === 0 && (
          <p className="text-gray-500 font-medium text-center">
            No bookmarks yet.
          </p>
        )}

        <div className="w-full flex flex-col gap-4">
          {bookmarks.map((b, i) => (
            <div
              key={i}
              className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <img src={b.favicon} alt="favicon" className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-blue-700">{b.title}</h3>
              </div>

              <p className="text-sm text-gray-700">{b.summary}</p>

              <div className="flex gap-2 mt-2">
                <a
                  href={b.url}
                  target="_blank"
                  rel="noreferrer"
                  className="black_btn"
                >
                  Visit
                </a>
                <button
                  onClick={() => handleDelete(i)}
                  className="black_btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookmarkDashboard;
