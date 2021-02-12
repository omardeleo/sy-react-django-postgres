import logo from './logo.png';

import './App.css';
import Prism from 'prismjs';
import "prismjs/themes/prism-tomorrow.css";

import { Grid, Box, Typography, Tooltip } from '@material-ui/core';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import ConnectCard from "./ConnectCard";
import DeployCard from "./DeployCard";
import MaterialCard from "./MaterialCard";
import ThemeCard from "./ThemeCard";
import UploadCard from "./UploadCard";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "30px",
    width: "calc(100% - 16px)",
    marginLeft: "8px"
  },
  card: {
    height: "700px",
    padding: "10px 25px",
  },
  cardHeader: {
    marginBottom: "30px"
  },
  img: {
    width: "200px",
    background: "white",
    padding: "0 10px",
    height: "100%",
    margin: "0 20px"
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    [theme.breakpoints.down('sm')]: {
      flexDirection: "column",
      textAlign: "center"
    },
  },
  gridContainer: {
    marginTop: 20,
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'auto',
  },
  gridList: {
    width: 500,
  },
  form: {
    marginTop: '50'
  }
}));

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
      <Box>
        <Box
          className={classes.box}
          display="flex"
        >
          <Tooltip title={<h3>Replace file at <code>`/frontend/src/logo.png`</code> with your logo file!</h3>}>
            <Box mt="20px" display="flex" flexDirection="column" alignItems="center">
              <img className={classes.img} src={logo} alt="Shipyard logo"/>
              <Typography variant="caption">Hover over logo to replace</Typography>
            </Box>
          </Tooltip>
          <h1>React/Django/Postgres Starter Project</h1>
        </Box>
        <Grid container className={classes.container} spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <ThemeCard classes={classes} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <MaterialCard classes={classes} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <ConnectCard classes={classes} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <UploadCard classes={classes}/>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <DeployCard classes={classes}/>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
