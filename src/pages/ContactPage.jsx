import React from "react";

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Link as RouterLink } from "react-router-dom";
import contactIllustration from "../assets/contact-illu-01.png";
import { useTranslation } from 'react-i18next';

function ContactPage() {
  const { t } = useTranslation();
  return (
    <Container style={{textAlign:"center"}}>
      <Box m={3}>
        <Typography variant="h4" align="center">
          {t("fpContact")}
        </Typography>
        <img style={{margin:16}} src={contactIllustration} alt="404" />
        <Paper style={{ padding: 14, width: 640, margin: "12px auto" }}>
          <Typography variant="body1" gutterBottom>
            {t("contact1")}{" "}
            <Link href="mailto:pascal@dogathome.ch">pascal@dogathome.ch</Link>
            .{" "}{t("contact2")}
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

export default ContactPage;
