import React from "react";

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
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
