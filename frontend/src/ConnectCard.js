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
    <pre><code className={props.language}>
      { `${props.code}` }
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

  const resetCounter = () => {
    fetch("/api/v1/reset/")
      .then(res => res.json())
      .then(data => fetchData())
  }

  useEffect(() => fetchData(), []);

  const codeBlock =`16 |    def reset(self):
17 |       self.value = 0
18 |       self.save()`

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else return (
    <Card className={classes.card}>
      <h2>Connect to a server</h2>
      <Box display="flex" flexDirection="row" alignItems="center" mt={-3} mb={-1}>
        <Box mr={1}>
          <h3>Powered by</h3>
        </Box>
        <img width="75px" height="100%" src={djangoLogo} alt="Django Logo"/>
      </Box>
      <p>This React frontend is connected to a Django server. Below is the response message we receive when we ping the server:</p>
      <p className={classes.response}>
        {data.response}
      </p>
      <p>The server ping count is stored to the database. Click below to <b>reset the counter:</b></p>
      <Box display="flex" justifyContent="center">
        <button onClick={resetCounter}>Reset Ping Counter</button>
      </Box>
      <br></br>
      <p>Update <code>`backend/src/counters/views.py`</code>, save the file, then refresh this page to <b>see a new response message.</b></p>
      <p>Replace the code below:</p>
      <ResponseBlock
        language="language-js"
        code='26 |  return JsonResponse({"response": response})'
      />
      <p>with:</p>
      <ResponseBlock
        language="language-js"
        code='26 |  return JsonResponse({"response": "I just updated the response message!"})'
      />
      <br></br>
      <p>The function that <b>resets the ping counter</b> is located in <code>`backend/src/counters/models.py`:</code></p>
      <ResponseBlock
        language="language-js"
        code={codeBlock}
      />
    </Card>
  );
}

export default ConnectCard;
