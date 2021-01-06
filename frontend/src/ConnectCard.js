import {
  Box,
  Card,
} from '@material-ui/core';
import Prism from 'prismjs';

import React, { useEffect, useState } from "react";

import djangoLogo from './django.png';

function ResponseBlock(props) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <pre><code className="language-html">
      { `${props.response}` }
    </code></pre>
  )
}

function ConnectCard(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const { classes } = props;

  const fetchData = () => {
    fetch("/api/v1/")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setData(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  useEffect(() => fetchData(), []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else return (
    <Card className={classes.card}>
      <h2 className={classes.cardHeader}>Connect to a server</h2>
      <p>This React frontend is connected to a Django backend.</p>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box mb="5px"><img width="100px" src={djangoLogo} /></Box>
      </Box>
      <p>Below is the response from our server.</p>
      <ResponseBlock response={data.response} />
      <p>Change the code at `code.js`, save the file, then refresh this page to see a new message.</p>
      <pre>
        <code className="language-js">
          { `Code placeholder` }
        </code>
      </pre>
    </Card>
  );
}

export default ConnectCard;
