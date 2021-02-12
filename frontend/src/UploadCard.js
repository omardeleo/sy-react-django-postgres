import { useEffect, useRef, useState } from 'react';
import { Box, Card, GridList, GridListTile, Link } from '@material-ui/core';

function UploadCard(props) {
  const inputEl = useRef(null);
  const [file, setFile] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

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
      <h2 className={props.classes.cardHeader}>Store files in S3, locally</h2>
      <p>Click below to select and upload an image from your computer.</p>
      <p>The image will be <b>stored in a local S3 bucket</b>, powered by <Link
          color="secondary"
          target="_blank"
          rel="noopener"
          href="https://github.com/localstack/localstack"
        >
          LocalStack
        </Link> - a fully functional local AWS cloud stack, and displayed below.</p>
        <Box display="flex" flexDirection="column" alignItems="center" mt={5} mb={5}>
          <form onSubmit={e => submitFile(e)}>
            <DjangoCSRFToken />
            <Box>
              <input ref={inputEl} type="file"
                accept=".jpg,.jpeg,.png,.gif"
                onChange={
                  event => {
                    setFile(event.target.files);
                  }
                }
              />
            </Box>
          <Box>
          <button type="submit">Upload</button>
          </Box>
        </form>
        </Box>

      { data ?
      <div className={props.classes.gridContainer}>
        <GridList
          cellHeight={100}
          className={props.classes.gridList}
          cols={3}
        >
          {data.map((src) => (
            <GridListTile key={src} cols={1}>
              <img src={src} alt="Uploaded to LocalStack" />
            </GridListTile>
          ))}
        </GridList>
      </div>
      : "" }
    </Card>
  );
}

export default UploadCard;
