import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import ***REMOVED*** Link as RouterLink ***REMOVED*** from "react-router-dom";
import dogHouse from "../assets/dog-house-01.png";
import ***REMOVED*** useTranslation ***REMOVED*** from 'react-i18next';

function NotFoundPage() ***REMOVED***
  const ***REMOVED*** t ***REMOVED*** = useTranslation();
  return (
    <Container>
      <Box m=***REMOVED***3***REMOVED*** textAlign="center">
        <Typography variant="h4" align="center" gutterBottom>
          ***REMOVED***t("nfPage")***REMOVED***
        </Typography>
        <img style=***REMOVED******REMOVED***margin:16***REMOVED******REMOVED*** src=***REMOVED***dogHouse***REMOVED*** alt="404" />
        <Typography variant="body1" align="center">
          <Link component=***REMOVED***RouterLink***REMOVED*** to="/">
            ***REMOVED***t("returnHome")***REMOVED***
          </Link>
        </Typography>
      </Box>
    </Container>
  );
***REMOVED***

export default NotFoundPage;
