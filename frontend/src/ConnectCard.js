import {
  Box,
  Card,
} from '@material-ui/core';

import Prism from 'prismjs';
import "prismjs/themes/prism-tomorrow.css";

import React, { useEffect, useState } from "react";

import djangoLogo from './django.png';

function ConnectCard(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch("/api/v1/")
      .then(res => res.json())
      .then(
        (result) => {
          console.log('hiya', result);
          setIsLoaded(true);
          setData(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  function ResponseBlock(props) {
    return (
      <pre><code className="language-html">
        { `${props.response}` }
      </code></pre>
    )
  }
  return (
    <Card className={props.classes.card}>
      <h2>Connect to a server</h2>
      <p>This React frontend is connected to a Django backend. Below is the response from our server.</p>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box mb="5px" onClick={fetchData}><img width="100px" src={djangoLogo} /></Box>
      </Box>
      { data.response ? <ResponseBlock response={data.response} /> : ""}
      <p>Change the code at `code.js`, save the file, then refresh this page to see a new message.</p>
    </Card>
  );
}

export default ConnectCard;
