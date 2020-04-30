import React from "react";

import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function CreditsPage() {
  const { t, i18n } = useTranslation();
  return (
    <Container>
      <Box m={3}>
        <Typography variant="h4" align="center">
          {t("fpCredits")}
        </Typography>
        <Paper style={{ padding: 14, width: 640, margin: "12px auto" }}>
          <Typography variant="h6" gutterBottom>
            {(t("credits1"))}:
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
          <Link component={RouterLink} to="/">
            {t("returnHome")}
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default CreditsPage;
