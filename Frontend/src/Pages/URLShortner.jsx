import { useState } from "react";
import axios from "axios";
import UrlCards from "./UrlCards";
import { toast } from "react-hot-toast";

const URLShortner = () => {
  const [urls, setUrls] = useState([]);
  const [originalUrl, setOriginalUrl] = useState("");
  const [customTail, setCustomTail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl) return;

    setIsSubmitting(true);

    try {
      const data = {
        url: originalUrl,
        shortUrl: customTail,
      };

      console.log("Data at Frontend:", data);

      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const res = await axios.post(`${API_URL}`, data);

      console.log("Response from Backend:", res.data);

      const newUrl = {
        id: Date.now(),
        originalUrl: originalUrl,
        shortUrl: res.data.shortUrl || customTail,
        clicks: 0,
        createdAt: new Date().toISOString(),
      };

      setUrls((prev) => [newUrl, ...prev]);

      setOriginalUrl("");
      setCustomTail("");
      toast.success("URL Shortened Successfully!");
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error.response?.data?.error || "Failed to shorten URL";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pt-32 pb-20 px-6 min-h-[calc(100vh-80px)] text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Create Your <span className="text-gradient">Short Link</span>
          </h1>
          <p className="text-muted text-lg">
            Enter your long URL and choose a custom path if you want.
          </p>
        </div>

        {/* Form Section */}
        <div className="glass-card p-8 rounded-3xl shadow-2xl border border-white/5 mb-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/*IDEA: Original URL Input box */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted ml-1">
                  Original URL
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://example.com/very-long-link"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50 transition-colors"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                />
              </div>

              {/*IDEA: Short URL Input box */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted ml-1">
                  Custom Link (Optional)
                </label>
                <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-primary/50 transition-colors">
                  <span className="text-muted text-sm border-r border-white/10 pr-3 mr-3">
                    url.short/
                  </span>
                  <input
                    type="text"
                    placeholder="my-link"
                    className="flex-1 bg-transparent border-none outline-none text-white"
                    value={customTail}
                    onChange={(e) => setCustomTail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* IDEA: Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`cursor-pointer w-full py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-primary/30 active:scale-95 flex items-center justify-center gap-2 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Shortening...
                </>
              ) : (
                "Shorten URL"
              )}
            </button>
          </form>
        </div>

        {/* List Section */}
        <UrlCards urls={urls} setUrls={setUrls} />
      </div>
    </section>
  );
};

export default URLShortner;
