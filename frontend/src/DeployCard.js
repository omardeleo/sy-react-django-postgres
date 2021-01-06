import { Card } from '@material-ui/core';

function DeployCard(props) {
  return (
    <Card className={props.classes.card}>
      <h2 className={props.classes.cardHeader}>Deploy your app</h2>
      <p>Easily deploy your app using Shipyard: https://shipyard.build/</p>
      <p>Alternatively, read this guide on how to deploy a containerized web app: https://cloud.google.com/kubernetes-engine/docs/tutorials/hello-app</p>
    </Card>
  );
}

export default DeployCard;