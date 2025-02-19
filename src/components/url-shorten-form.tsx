import type React from "react";
import { useState } from "react";
import axios from "axios";
import { shortenURL } from "../services/url.service";

const UrlShortener: React.FC = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setShortUrl("");

    try {
      const response = await shortenURL(url);
      setShortUrl(response.shortenURL);
    } catch (err) {
      setError("An error occurred while shortening the URL. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-background-light p-8 rounded-lg shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-text">
            URL Shortener
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="url" className="sr-only">
                URL to shorten
              </label>
              <input
                id="url"
                name="url"
                type="url"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-background-light placeholder-text-dark text-text bg-background focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Enter URL to shorten"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
              ) : null}
              {isLoading ? "Shortening..." : "Shorten URL"}
            </button>
          </div>
        </form>

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

        {shortUrl && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-text">Shortened URL:</h3>
            <div className="mt-2 flex rounded-md shadow-sm">
              <input
                type="text"
                readOnly
                value={shortUrl}
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md focus:ring-primary focus:border-primary sm:text-sm border-background-light bg-background text-text"
              />
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(shortUrl)}
                className="inline-flex items-center px-3 py-2 rounded-r-md border border-l-0 border-background-light bg-primary text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlShortener;
