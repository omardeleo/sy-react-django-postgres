import { useEffect, useRef, useState } from 'react';
import { Box, Button, Card, GridList, GridListTile, Link } from '@material-ui/core';

import localStackLogo from './localStackLogo.png';

function UploadCard(props) {
  const inputEl = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  const { classes } = props;
  const fetchData = () => {
    fetch('api/v1/files/')
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          const bucket = result['Name'];
          const filenames = result['Contents'] ?
            result['Contents']
              .map(file => `${bucket}/${file['Key']}`)
              .reverse() :
            [];
          setData(filenames);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  useEffect(() => {
    fetchData();
    async function getCookie() {
      const response = await fetch('/api/v1/files/csrf/');
      const token = await response.json();
      setToken(token.csrfToken);
    }
    getCookie();
  }, []);

  const DjangoCSRFToken = () => {
    return (
      token ?
      <input type="hidden" name="csrfmiddlewaretoken" value={token} /> :
      ""
    );
  };

  const submitFile = async (e) => {
    e.preventDefault();
    const file = e.target.files;
    try {
      if (!file) {
        throw new Error('Please select an image');
      }
      const formData = new FormData();
      formData.append('file', file[0]);
      const response = await fetch('/api/v1/files/upload/', {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRFToken': token
        }
      })
      await response.json();
      inputEl.current.value = "";
      fetchData();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Card className={props.classes.card}>
      <h2>Store files in S3, locally</h2>
      <Box display="flex" flexDirection="row" alignItems="center" mt={-3} mb={-1}>
        <Box mr={1}>
          <h3>Powered by</h3>
        </Box>
        <img width="75px" height="100%" src={localStackLogo} alt="Express Logo"/>
      </Box>
      <p>Click below to select and upload an image from your computer.</p>
      <p>The image will be <b>stored in a local S3 bucket</b>, powered by <Link
          className={classes.link}
          target="_blank"
          rel="noopener"
          href="https://github.com/localstack/localstack"
        >
          <b>LocalStack</b>
        </Link> - a fully functional local AWS cloud stack, and displayed below.</p>
          <form onSubmit={e => submitFile(e)}>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={2} mb={3}>
              <DjangoCSRFToken />
              <Button
                variant="contained"
                className={classes.contained}
                component="label"
                size="small"
              >
                Upload Image
                <input ref={inputEl}
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif"
                  onChange={
                    event => {
                      submitFile(event);
                    }
                  }
                  hidden
                />
              </Button>
            </Box>
          </form>

      { data ?
      <Box display="flex" flexDirection="row" justifyContent="center">
        <div className={classes.gridContainer}>
          <GridList
            cellHeight={100}
            cols={3}
          >
            {data.map((src) => (
              <GridListTile key={src} cols={1}>
                <img src={src} alt="Uploaded to LocalStack" />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </Box>
      : "" }
    </Card>
  );
}

export default UploadCard;
