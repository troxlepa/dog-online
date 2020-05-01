import React from "react";

import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import ***REMOVED*** Link as RouterLink ***REMOVED*** from "react-router-dom";
import ***REMOVED*** useTranslation ***REMOVED*** from 'react-i18next';

function HelpPage() ***REMOVED***
  const ***REMOVED*** t ***REMOVED*** = useTranslation();
  return (
    <Container>
      <Box m=***REMOVED***3***REMOVED***>
        <Typography variant="h4" align="center">
          ***REMOVED***t("fpHelp")***REMOVED***
        </Typography>
        <Paper style=***REMOVED******REMOVED*** padding: 14, width: 640, margin: "12px auto" ***REMOVED******REMOVED***>
          <Typography variant="body1" gutterBottom>
            ***REMOVED***t("help1")***REMOVED***
          </Typography>
          .<br/>
          <Typography variant="body1" gutterBottom>
            <b>***REMOVED***t("FAQ")***REMOVED***</b>
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>***REMOVED***t('faq1')***REMOVED***</b>
            <br/>
            ***REMOVED***t('faq1a')***REMOVED***
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>***REMOVED***t('faq2')***REMOVED***</b>
            <br/>
            ***REMOVED***t('faq2a')***REMOVED***
          </Typography>
        </Paper>
        <Typography variant="body1" align="center">
          <Link component=***REMOVED***RouterLink***REMOVED*** to="/">
            ***REMOVED***t("returnHome")***REMOVED***
          </Link>
        </Typography>
      </Box>
    </Container>
  );
***REMOVED***

export default HelpPage;
