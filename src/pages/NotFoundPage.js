import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { Link as RouterLink } from "react-router-dom";
import dogHouse from "../assets/dog-house-01.png";
import { useTranslation } from 'react-i18next';

function NotFoundPage() {
  const { t, i18n } = useTranslation();
  return (
    <Container>
      <Box m={3} textAlign="center">
        <Typography variant="h4" align="center" gutterBottom>
          {t("nfPage")}
        </Typography>
        <img style={{margin:16}} src={dogHouse} alt="404" />
        <Typography variant="body1" align="center">
          <Link component={RouterLink} to="/">
            {t("returnHome")}
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default NotFoundPage;
