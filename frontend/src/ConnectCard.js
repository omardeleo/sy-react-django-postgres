import {
  Box,
  Card,
} from '@material-ui/core';

import Prism from 'prismjs';
import "prismjs/themes/prism-tomorrow.css";

import React, { useEffect, useState } from "react";

import djangoLogo from './django.png';

const code3 = `Hi! I'm an Express server.

I'm running on port 3001.
I've been pinged 6 times.
Last pinged on 1/5/21 at 3:00:01PM.`

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
      <h2>Connect to any server</h2>
      <p>You can connect this React frontend to a number of different backend frameworks.</p>
      <p>Some popular backend frameworks are:</p>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box mb="5px" onClick={fetchData}><img width="100px" src={djangoLogo} /></Box>
      </Box>
      <p>Click on any of the frameworks above to make a request to that server, and see the response below.</p>
    { data.response ? <ResponseBlock response={data.response} /> : ""}
  
    </Card>
  );
}

export default ConnectCard;
