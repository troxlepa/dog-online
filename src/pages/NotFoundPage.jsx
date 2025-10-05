import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import dogHouse from "../assets/dog-house-01.png";
import { useTranslation } from 'react-i18next';

function NotFoundPage() {
  const { t } = useTranslation();
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
