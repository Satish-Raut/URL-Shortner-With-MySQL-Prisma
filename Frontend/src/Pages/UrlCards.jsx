import { useEffect, useState } from "react";
import axios from "axios";

const UrlCards = ({ urls, setUrls }) => {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = async (id, shortcode) => {
    const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
    const fullUrl = `${BACKEND_URL}/${shortcode}`;
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const res = await axios.get(`${API_URL}/urlshortner`);

        // Map backend database fields to frontend property names
        const mappedData = res.data.map((item) => ({
          id: item.id,
          originalUrl: item.url,
          shortUrl: item.shortcode,
          clicks: item.clicks,
          createdAt: item.created_at,
        }));

        setUrls(mappedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch on initial load
    fetchUrls();

    // Re-fetch when user returns to this tab (makes clicks feel dynamic)
    window.addEventListener("focus", fetchUrls);
    return () => window.removeEventListener("focus", fetchUrls);
  }, [setUrls]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold px-2">Recent Links</h2>
      <div className="grid gap-4">
        {urls.length > 0 ? (
          urls.map((url) => (
            <div
              key={url.id}
              className="glass-card p-4 sm:p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/5 group hover:border-white/10 transition-all"
            >
              {/* IDEA: URL-Details */}
              <div className="flex-1 min-w-0 w-full">
                <div className="flex items-center gap-2 mb-2">
                  {/* Short URL (Clickable) */}
                  <a
                    href={`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/${url.shortUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-bold hover:underline truncate text-base sm:text-lg"
                  >
                    url.short/{url.shortUrl}
                  </a>

                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopy(url.id, url.shortUrl)}
                    className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                      copiedId === url.id
                        ? "bg-green-500/20 text-green-400"
                        : "hover:bg-white/5 text-muted"
                    }`}
                    title={copiedId === url.id ? "Copied!" : "Copy link"}
                  >
                    {copiedId === url.id ? (
                      <svg
                        className="w-4 h-4 cursor-pointer"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 cursor-pointer"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Original URL */}
                <p className="text-sm text-muted break-all sm:truncate max-w-full md:max-w-md">
                  {url.originalUrl}
                </p>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                {/* IDEA: Click Counts */}
                <div className="text-center md:text-right">
                  <p className="text-[10px] uppercase tracking-wider text-muted font-bold mb-1">
                    Clicks
                  </p>
                  <p className="text-xl font-bold text-white">{url.clicks}</p>
                </div>
                {/* IDEA: Current date showing */}
                <div className="text-center md:text-right">
                  <p className="text-[10px] uppercase tracking-wider text-muted font-bold mb-1">
                    Date
                  </p>
                  <p className="text-sm font-medium text-white/80">
                    {new Date(url.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 glass-card rounded-3xl border border-dashed border-white/10">
            <p className="text-muted">
              No links created yet. Start shortening!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlCards;
