import { useEffect, useRef, useState } from 'react';
import { Box, Card, GridList, GridListTile, Link } from '@material-ui/core';

function UploadCard(props) {
  const inputEl = useRef(null);
  const [file, setFile] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = () => {
    fetch('api/v1/files/')
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          console.log(result)
          const bucket = result['Name'];
          console.log(bucket)
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

  useEffect(() => fetchData(), []);
    function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

console.log('token', csrftoken)
const DjangoCSRFToken = () => {
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
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
          'X-CSRFToken': csrftoken
        }
      })
      const thing = await response.json()
      console.log(thing)
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
      <p>The image will be stored in a local S3 bucket, powered by <Link
          color="secondary"
          target="_blank"
          rel="noopener"
          href="https://github.com/localstack/localstack"
        >
          LocalStack
        </Link> - a fully functional local AWS cloud stack.</p>
        <Box display="flex" flexDirection="column" alignItems="center"> 
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
        <GridList cellHeight={100} className={props.classes.gridList} cols={1}>
          {data.map((src) => (
            <GridListTile key={src} cols={1} mb={5}>
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
