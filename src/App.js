import React, { useState, useEffect } from "react";
import { Container, Snackbar } from "@material-ui/core";

import Header from "./components/Header";
import SendTweet from "./components/SendTweet";
import ListTweets from "./components/ListTweets";

import { TWEETS_STORAGE } from "./utils/Constants";

function App() {
  const [toastProps, setToastProps] = useState({
    open: false,
    text: null,
  });

  const [allTweets, setAllTweets] = useState([]);

  const [reloadTweet, setReloadTweet] = useState(false);

  useEffect(() => {
    const AllTweetsStorage = localStorage.getItem(TWEETS_STORAGE);
    const allTweets = JSON.parse(AllTweetsStorage);
    setAllTweets(allTweets);
    setReloadTweet(false);
  }, [reloadTweet]);

  const deleteTweet = (index) => {
    allTweets.splice(index, 1);
    setAllTweets(allTweets);
    localStorage.setItem(TWEETS_STORAGE, JSON.stringify(allTweets));
    setReloadTweet(true);
  };

  return (
    <Container className="tweets-simulator" maxWidth={false}>
      <Header />
      <SendTweet
        setToastProps={setToastProps}
        setReloadTweet={setReloadTweet}
        allTweets={allTweets}
      />
      <ListTweets allTweets={allTweets} deleteTweet={deleteTweet} />
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={toastProps.open}
        autoHideDuration={2000}
        onClose={() =>
          setToastProps({
            open: false,
          })
        }
        message={<span id="message-id">{toastProps.text}</span>}
      />
    </Container>
  );
}

export default App;
