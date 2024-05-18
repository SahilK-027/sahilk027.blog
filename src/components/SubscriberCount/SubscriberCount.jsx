import React, { useEffect, useState } from "react";
import "./SubscriberCount.scss";
import Environment from "../../data/Environment";

const SubscriberCount = () => {
  const env = Environment;
  let SERVER_LINK = "";
  if (env === "development") {
    SERVER_LINK = "http://localhost:2710";
  } else if (env === "production") {
    SERVER_LINK = "https://api-sk-blog-server.vercel.app";
  }

  const [subscribersCount, setSubscribersCount] = useState("No");
  const [loadingSubscribersCount, setLoadingSubscribersCount] = useState(true);

  const formatSubscribersCount = (count) => {
    if (count <= 999) {
      return count.toString();
    } else if (count >= 1000 && count <= 999999) {
      // Between 1k and 999.9k
      const formattedCount = count / 1000;
      const decimalPart = formattedCount % 1;
      if (decimalPart < 0.1) {
        return Math.floor(formattedCount) + "k";
      } else {
        return formattedCount.toFixed(1) + "k";
      }
    } else if (count >= 1000000 && count <= 999999999) {
      // Never know if I will ever reach here...LOL just kidding 😂
      // Noting down the date for future reference - 1st May 2024
      // Between 1M and 999.9M
      const formattedCount = count / 1000000;
      const decimalPart = formattedCount % 1;
      if (decimalPart < 0.1) {
        return Math.floor(formattedCount) + "M";
      } else {
        return formattedCount.toFixed(1) + "M";
      }
    } else if (count >= 1000000000) {
      // Billion or more 😲
      // I hope I reach here someday 😅
      const formattedCount = count / 1000000000;
      return formattedCount.toFixed(1) + "B";
    }
  };

  useEffect(() => {
    const fetchSubscribersCount = async () => {
      try {
        setLoadingSubscribersCount(true);
        const response = await fetch(`${SERVER_LINK}/subscribers-count`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          const count = formatSubscribersCount(data.count);
          setSubscribersCount(count);
        }
      } catch (error) {
        console.error(
          "Oops 😬! Something went wrong on server side. Please try again later."
        );
      } finally {
        setLoadingSubscribersCount(false);
      }
    };

    fetchSubscribersCount();
  }, []);
  return (
    <div className="sub-count-container">
      <div className="count-para">@sahilk-027 • </div>
      <div className="subscribers-count">
        {loadingSubscribersCount ? (
          <div className="dot-flashing"></div>
        ) : (
          <>{subscribersCount} subscribers</>
        )}
      </div>
    </div>
  );
};

export default SubscriberCount;
