import React from "react";

import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import ***REMOVED*** Link as RouterLink ***REMOVED*** from "react-router-dom";
import ***REMOVED*** useTranslation ***REMOVED*** from 'react-i18next';

function CreditsPage() ***REMOVED***
  const ***REMOVED*** t ***REMOVED*** = useTranslation();
  return (
    <Container>
      <Box m=***REMOVED***3***REMOVED***>
        <Typography variant="h4" align="center">
          ***REMOVED***t("fpCredits")***REMOVED***
        </Typography>
        <Paper style=***REMOVED******REMOVED*** padding: 14, width: 640, margin: "12px auto" ***REMOVED******REMOVED***>
          <Typography variant="h6" gutterBottom>
            ***REMOVED***(t("credits1"))***REMOVED***:
          </Typography>
          <Typography variant="body1" gutterBottom>
            <Link href="https://github.com/ekzhang/setwithfriends">Set with friends</Link>
          </Typography>
          <Typography variant="h6" gutterBottom>
            Audio:<br/>
          </Typography>
          <Typography variant="body1" gutterBottom>
            Winning Sound - <Link href="http://www.orangefreesounds.com/winning-sound-effect/">http://www.orangefreesounds.com/winning-sound-effect/</Link>
          </Typography>
          <Typography variant="body1" gutterBottom>
            Sad Trombone - <Link href="https://freesound.org/people/Benboncan/sounds/73581/">https://freesound.org/people/Benboncan/sounds/73581/</Link>
          </Typography>
          <Typography variant="body1" gutterBottom>
            Laugh - <Link href="http://www.orangefreesounds.com/hehehe-laugh/">http://www.orangefreesounds.com/hehehe-laugh/</Link>
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

export default CreditsPage;
