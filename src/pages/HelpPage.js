import React from "react";

import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function HelpPage() {
  const { t } = useTranslation();
  return (
    <Container>
      <Box m={3}>
        <Typography variant="h4" align="center">
          {t("fpHelp")}
        </Typography>
        <Paper style={{ padding: 14, width: 640, margin: "12px auto" }}>
          <Typography variant="body1" gutterBottom>
            {t("help1")}
          </Typography>
          .<br/>
          <Typography variant="body1" gutterBottom>
            <b>{t("FAQ")}</b>
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>{t('faq1')}</b>
            <br/>
            {t('faq1a')}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>{t('faq2')}</b>
            <br/>
            {t('faq2a')}
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

export default HelpPage;
