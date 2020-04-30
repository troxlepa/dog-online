import React from "react";

import ***REMOVED*** makeStyles ***REMOVED*** from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Loading from "../components/Loading";

const useStyles = makeStyles(***REMOVED***
  loadingContainer: ***REMOVED***
    padding: 48,
    textAlign: "center"
***REMOVED***
***REMOVED***);

function LoadingPage() ***REMOVED***
  const styles = useStyles();
  return (
    <Container className=***REMOVED***styles.loadingContainer***REMOVED***>
      <Loading />
    </Container>
  );
***REMOVED***

export default LoadingPage;
