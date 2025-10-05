import React, { useState, useEffect } from "react";

import { Link as RouterLink, Redirect } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Intro from "../assets/intro-01.svg";
import { useTranslation } from 'react-i18next';
import { isMobile } from "react-device-detect";

let styled = {};
if(isMobile){
  styled = {
    indexMenu: {
      margin: 26,
      "& a": {
        margin: 12
      }
    },
    container: {
      padding: 20,
      height: "100%",
      textAlign: "center"
    },
    svgWrapper: {
      alignItems:"center",
      justifyContent:"center",
      textAlign: "center"
    },
    introSvg: {
      width: "100%"
    }
  };
}else{
  styled = {
    indexMenu: {
      margin: 26,
      "& a": {
        margin: 12
      }
    },
    container: {
      padding: 20,
      height: "100%",
      textAlign: "center"
    },
    svgWrapper: {
      alignItems:"center",
      justifyContent:"center",
      textAlign: "center"
    },
    introSvg: {
      width: "60%"
    }
  };
}
const useStyles = makeStyles(styled);
function IndexPage() {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const { t } = useTranslation();
  // const transitions = useTransition(!redirect, () => ({
  //   from: { opacity: 0 },
  //   enter: { opacity: 1 },
  //   leave: { opacity: 0 },
  //   config: config.stiff
  // }));
  console.log("IndexPage.jsx");
  console.log("redirect", redirect);

  useEffect(() => {
    function handleKeyDown(evt) {
      if (evt.code === "Enter" || evt.code === "Space") {
        setRedirect(true);
      }
    }
    document.body.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return redirect ? (
    <Redirect to="/lobby" />
  ) : (
  
        <Container>
          <div>
            <div className={classes.svgWrapper}>
              <img alt="" className={classes.introSvg} src={Intro} />
            </div>
            <Container className={classes.container}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => setRedirect(true)}
              >
                <Typography>Start</Typography>
              </Button>
              <Typography variant="subtitle1">
                <div className={classes.indexMenu}>
                  <Link component={RouterLink} to="/help">
                    {t("fpHelp")}
                  </Link>
                  <Link component={RouterLink} to="/about">
                    {t("fpAbout")}
                  </Link>
                  <Link component={RouterLink} to="/credits">
                    {t("fpCredits")}
                  </Link>
                  <Link component={RouterLink} to="/contact">
                    {t("fpContact")}
                  </Link>
                </div>
              </Typography>
            </Container>
          </div>
        </Container>
      )
}

export default IndexPage;
