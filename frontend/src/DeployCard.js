import { Card, Box, Link } from '@material-ui/core';
import logo from './logo.png';

function DeployCard(props) {
  return (
    <Card className={props.classes.card}>
      <h2 className={props.classes.cardHeader}>Deploy your app to the cloud</h2>
      <p>Easily deploy your app using Shipyard.</p>
      <Box display="flex" justifyContent="center" pt="20px" mb="40px">
        <Link href="https://shipyard.build" target="_blank" rel="noopener">
          <img width="150px" src={logo} alt="Shipyard logo"/>
        </Link>
      </Box>
      <p>Alternatively, read this guide on how to deploy a containerized web app:{" "}
        <Link
          color="secondary"
          target="_blank"
          rel="noopener"
          href="https://cloud.google.com/kubernetes-engine/docs/tutorials/hello-app"
        >
          https://cloud.google.com/kubernetes-engine/docs/tutorials/hello-app
        </Link>
      </p>
    </Card>
  );
}

export default DeployCard;
