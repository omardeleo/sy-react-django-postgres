import { Card, Link } from '@material-ui/core';

function ThemeCard(props) {
  const codeBlock_1 =`65 |  const theme = createMuiTheme({ 
66 |    palette: {
67 |      type: 'dark',
68 |    }
69 |  });`

  const codeBlock_2 =`65 |  const theme = createMuiTheme({ 
66 |    palette: {
67 |      type: 'light',
68 |    }
69 |  });`

  return (
    <Card className={props.classes.card}>
          <h2 className={props.classes.cardHeader}>Update appearance</h2>
          <p>Modify the appearance of your app by using Material-UI's built-in themes, or 
      by creating a custom theme.</p>
      <p>To switch from <b>Dark Mode</b> to <b>Light Mode</b>, open <code>`frontend/src/App.js`</code> and replace the following code:</p>
          <pre><code className="language-js">
             { codeBlock_1 }
            </code></pre>
            <p>with:</p>
            <pre><code className="language-js">
             { codeBlock_2 }
            </code></pre>
            <p><Link color="secondary" href="https://material-ui.com/customization/theming/" target="_blank">Click here</Link> to learn more about Material-UI themes.</p>
        </Card>
  );
}

export default ThemeCard;
