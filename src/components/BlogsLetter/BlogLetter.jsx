import Environment from "../../data/Environment";
import { animated, useSpring } from "react-spring";
import { toast } from "react-toastify";
import { useState } from "react";
import "./BlogLetter.scss";

/**
 * BlogLetter component
 * @returns {JSX.Element} - BlogLetter component
 */
const BlogLetter = () => {
  const [mail, setMail] = useState("");
  const [isMakingNWCall, setIsMakingNWCall] = useState(false);
  const [success, setSuccess] = useState(false);

  // Define animation properties
  const thanksAnimation = useSpring({
    opacity: success ? 1 : 0,
    transform: success ? "translateY(0px)" : "translateY(-20px)",
  });

  const env = Environment;
  let SERVER_LINK = "";
  if (env === "development") {
    SERVER_LINK = "http://localhost:2710";
  } else if (env === "production") {
    SERVER_LINK = "https://api-sk-blog-server.vercel.app";
  }
  const handleSubscriptionCall = async (e) => {
    e.preventDefault();
    const EMAIL_TEST = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isValidMail = EMAIL_TEST.test(mail);

    if (!isValidMail) {
      toast.error("Please enter a valid email address. 👀", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    try {
      setIsMakingNWCall(true);
      const response = await fetch(`${SERVER_LINK}/subscribe`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: mail,
        }),
      });

      if (response.ok) {
        toast.success("Thank you for subscribing to my blogs 🙇‍♂️!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setSuccess(true);
      } else {
        const error = await response.json();
        toast.info(error.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
    } catch (error) {
      toast.error(
        "Oops 😬! Something went wrong on server side. Please try again later.",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    } finally {
      setIsMakingNWCall(false);
    }
  };

  return (
    <>
      <div className="blog-letter">
        <div className="blogletter-container">
          <form onSubmit={handleSubscriptionCall}>
            <input
              type="email"
              placeholder="@ Enter your email address"
              required
              onChange={(e) => setMail(e.target.value)}
            />
            <button
              className="btn"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              type="submit"
              disabled={isMakingNWCall}
            >
              {isMakingNWCall ? (
                <div className="spinner-loader"></div>
              ) : (
                <span>Subscribe</span>
              )}
            </button>
          </form>
          {success ? (
            <animated.p id="thanks" style={thanksAnimation}>
              Thanks for subscribing 💖! You will receive welcome mail soon!
            </animated.p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogLetter;
