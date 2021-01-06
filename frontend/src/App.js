import logo from './logo.svg';

import './App.css';
import Prism from 'prismjs';
import "prismjs/themes/prism-tomorrow.css";

import { Grid } from '@material-ui/core';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import ConnectCard from "./ConnectCard";
import DeployCard from "./DeployCard";
import MaterialCard from "./MaterialCard";
import ThemeCard from "./ThemeCard";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "100vh",
    padding: "30px",
    width: "calc(100% - 16px)",
    marginLeft: "8px"
  },
  card: {
    height: "700px",
    padding: "0 15px",
  },
  cardHeader: {
    marginBottom: "30px"
  }
});

function App() {
  const classes = useStyles();

  const theme = createMuiTheme({
    palette: {
      type: 'dark',
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container className={classes.container} spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <ThemeCard classes={classes} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <MaterialCard classes={classes} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <ConnectCard classes={classes} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <DeployCard classes={classes}/>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
