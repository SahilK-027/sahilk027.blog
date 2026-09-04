import { useState } from "react";
import "./ShareBar.scss";

/**
 * Compact share row for a blog post: X / LinkedIn / copy-link. `url` defaults
 * to the live page URL; `title` seeds the pre-filled share text.
 */
const ShareBar = ({ title = "", url }) => {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(title);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // Fallback for non-secure contexts / older browsers.
      const el = document.createElement("textarea");
      el.value = shareUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="share-bar" role="group" aria-label="Share this post">
      <span className="share-bar__label">Share</span>
      <a
        className="share-bar__btn"
        href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on X"
        title="Share on X"
      >
        <i className="fa-brands fa-x-twitter" aria-hidden="true" />
      </a>
      <a
        className="share-bar__btn"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <i className="fa-brands fa-linkedin-in" aria-hidden="true" />
      </a>
      <button
        type="button"
        className={`share-bar__btn share-bar__btn--copy${
          copied ? " is-copied" : ""
        }`}
        onClick={copyLink}
        aria-label={copied ? "Link copied" : "Copy link"}
        title={copied ? "Link copied" : "Copy link"}
      >
        <i
          className={`fa-solid ${copied ? "fa-check" : "fa-link"}`}
          aria-hidden="true"
        />
        <span className="share-bar__copy-text">
          {copied ? "Copied" : "Copy link"}
        </span>
      </button>
    </div>
  );
};

export default ShareBar;
