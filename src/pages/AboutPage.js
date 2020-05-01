import React from "react";

import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import ***REMOVED*** Link as RouterLink ***REMOVED*** from "react-router-dom";
import ***REMOVED*** useTranslation ***REMOVED*** from 'react-i18next';

function AboutPage() ***REMOVED***
  const ***REMOVED*** t ***REMOVED*** = useTranslation();
  return (
    <Container>
      <Box m=***REMOVED***3***REMOVED***>
        <Typography variant="h4" align="center">
          ***REMOVED***t("fpAbout")***REMOVED***
        </Typography>
        <Paper style=***REMOVED******REMOVED*** padding: 14, width: 640, margin: "12px auto" ***REMOVED******REMOVED***>
          <Typography variant="body1" gutterBottom>
            ***REMOVED***t("about1")***REMOVED******REMOVED***" "***REMOVED***
            <Link href="https://github.com/troxlepa">troxlepa</Link> ***REMOVED***" "***REMOVED*** ***REMOVED***t("about2")***REMOVED*** ***REMOVED***" "***REMOVED*** 
            <Link href="https://github.com/ekzhang/setwithfriends">Set with friends</Link>***REMOVED***" "***REMOVED*** ***REMOVED***t("about3")***REMOVED*** ***REMOVED***" "***REMOVED***<Link href="https://github.com/ekzhang/">ekzhang</Link>.
          </Typography>
        </Paper>
        <Typography variant="body1" align="center">
          <Link component=***REMOVED***RouterLink***REMOVED*** to="/">
            ***REMOVED***t('returnHome')***REMOVED***
          </Link>
        </Typography>
      </Box>
    </Container>
  );
***REMOVED***

export default AboutPage;
