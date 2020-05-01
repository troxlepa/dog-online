import React from "react";

import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function AboutPage() {
  const { t } = useTranslation();
  return (
    <Container>
      <Box m={3}>
        <Typography variant="h4" align="center">
          {t("fpAbout")}
        </Typography>
        <Paper style={{ padding: 14, width: 640, margin: "12px auto" }}>
          <Typography variant="body1" gutterBottom>
            {t("about1")}{" "}
            <Link href="https://github.com/troxlepa">troxlepa</Link> {" "} {t("about2")} {" "} 
            <Link href="https://github.com/ekzhang/setwithfriends">Set with friends</Link>{" "} {t("about3")} {" "}<Link href="https://github.com/ekzhang/">ekzhang</Link>.
          </Typography>
        </Paper>
        <Typography variant="body1" align="center">
          <Link component={RouterLink} to="/">
            {t('returnHome')}
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default AboutPage;
