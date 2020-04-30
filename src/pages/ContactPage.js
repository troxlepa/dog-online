import React from "react";

import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { Link as RouterLink } from "react-router-dom";
import contactIllustration from "../assets/contact-illu-01.png";
import { useTranslation } from 'react-i18next';

function ContactPage() {
const { t, i18n } = useTranslation();
  return (
    <Container style={{textAlign:"center"}}>
      <Box m={3}>
        <Typography variant="h4" align="center">
          {t("fpContact")}
        </Typography>
        <img style={{margin:16}} src={contactIllustration} alt="404" />
        <Paper style={{ padding: 14, width: 640, margin: "12px auto" }}>
          {/*<Typography variant="body1" gutterBottom>
            Issues and pull requests can be submitted through{" "}
            <Link href="https://github.com/ekzhang/setwithfriends">Github</Link>
            . You can also contact the authors by email at{" "}
            <Link href="mailto:ekzhang1@gmail.com">ekzhang1@gmail.com</Link> and{" "}
            <Link href="mailto:cynthiakedu@gmail.com">
              cynthiakedu@gmail.com
            </Link>
            .
          </Typography>*/}
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
