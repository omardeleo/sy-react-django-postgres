import { Card, List, ListItem, ListItemText, Chip, Link } from '@material-ui/core';

function MaterialCard(props) {
  const seasons = ["Winter", "Spring", "Summer", "Fall"];
  const codeBlock_3 = `12 | { seasons.map(season => <Chip label={season} />) } `;
  const codeBlock_4 = `12 | { seasons.map(season => <ListItem button><ListItemText primary={season}/></ListItem>) } `;
  return (
    <Card className={props.classes.card}>
          <h2 className={props.classes.cardHeader}>Use Material-UI components</h2>
          <p>Material-UI provides a variety of UI components to render data.</p>
          <List>
            { seasons.map(season => <Chip label={season} />) }
          </List>
          <p>To change the <b>chips</b> above to <b>list items</b>, open <code>`frontend/src/MaterialCard.js`</code> and replace the following code:</p>
          <pre><code className="language-js">
             { codeBlock_3 }
            </code></pre>
            <p>with:</p>
            <pre><code className="language-js">
             { codeBlock_4 }
            </code></pre>
          <p>Read the Material-UI docs to learn more about components: <Link color="secondary" href="https://material-ui.com/" target="_blank" rel="noopener">https://material-ui.com/.</Link></p>
        </Card>
  );
}

export default MaterialCard;
