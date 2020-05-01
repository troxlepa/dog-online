import React from "react";

import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import ***REMOVED*** Link as RouterLink ***REMOVED*** from "react-router-dom";
import contactIllustration from "../assets/contact-illu-01.png";
import ***REMOVED*** useTranslation ***REMOVED*** from 'react-i18next';

function ContactPage() ***REMOVED***
  const ***REMOVED*** t ***REMOVED*** = useTranslation();
  return (
    <Container style=***REMOVED******REMOVED***textAlign:"center"***REMOVED******REMOVED***>
      <Box m=***REMOVED***3***REMOVED***>
        <Typography variant="h4" align="center">
          ***REMOVED***t("fpContact")***REMOVED***
        </Typography>
        <img style=***REMOVED******REMOVED***margin:16***REMOVED******REMOVED*** src=***REMOVED***contactIllustration***REMOVED*** alt="404" />
        <Paper style=***REMOVED******REMOVED*** padding: 14, width: 640, margin: "12px auto" ***REMOVED******REMOVED***>
          <Typography variant="body1" gutterBottom>
            ***REMOVED***t("contact1")***REMOVED******REMOVED***" "***REMOVED***
            <Link href="mailto:pascal@dogathome.ch">pascal@dogathome.ch</Link>
            .***REMOVED***" "***REMOVED******REMOVED***t("contact2")***REMOVED***
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

export default ContactPage;
