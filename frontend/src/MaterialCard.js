import { Card, List, ListItem, ListItemText, Link } from '@material-ui/core';

function MaterialCard(props) {
  const seasons = ["Winter", "Spring", "Summer", "Fall"];
  const codeBlock_3 = `100 | seasons.map(season => <ListItem button><ListItemText primary={season}/></ListItem>) `;
  const codeBlock_4 = `100 | seasons.map(season => <Chip label={season} />) `;
  return (
    <Card className={props.classes.card}>
          <h2 className={props.classes.cardHeader}>Use Material-UI components</h2>
          <p>Lists and tables are some of the ways you can display data.</p>
          <List>
            { seasons.map(season => <ListItem button><ListItemText primary={season}/></ListItem>) }
          </List>
          <p>To render list items as chips, open <code>`src/App.js`</code> and replace the following code:</p>
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

        