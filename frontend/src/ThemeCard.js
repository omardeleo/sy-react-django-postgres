import { Card, Link } from '@material-ui/core';

function ThemeCard(props) {
  const codeBlock_1 =`91 |  const theme = createMuiTheme({
92 |    palette: {
93 |      type: 'dark',
94 |    }
95 |  });`

  const codeBlock_2 =`91 |  const theme = createMuiTheme({
92 |    palette: {
93 |      type: 'light',
94 |    }
95 |  });`

  const {classes} = props;
console.log('env', process.env.REACT_APP_STARTER_REPO_URL)
  return (
    <Card className={props.classes.card}>
          <h2 className={props.classes.cardHeader}>Update appearance</h2>
          <p>Modify the appearance of your app by using Material-UI's built-in themes, or 
      by creating a custom theme.</p>
      <p>To switch from <b>Dark Mode</b> to <b>Light Mode</b>, open <code><Link className={classes.link} href={`${process.env.REACT_APP_STARTER_REPO_URL}frontend/src/App.js#L91-L95`} target="_blank">`frontend/src/App.js`
</Link></code> and replace the following code:</p>
          <pre><code className="language-js">
             { codeBlock_1 }
            </code></pre>
            <p>with:</p>
            <pre><code className="language-js">
             { codeBlock_2 }
            </code></pre>
            <p><Link className={classes.link} href="https://material-ui.com/customization/theming/" target="_blank"><b>Click here</b></Link> to learn more about Material-UI themes.</p>
        </Card>
  );
}

export default ThemeCard;
