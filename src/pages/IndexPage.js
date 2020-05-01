import React, ***REMOVED*** useState, useEffect ***REMOVED*** from "react";

import ***REMOVED*** Link as RouterLink, Redirect ***REMOVED*** from "react-router-dom";
import ***REMOVED*** makeStyles ***REMOVED*** from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import ***REMOVED*** animated, useTransition, config ***REMOVED*** from "react-spring";
import Intro from "../assets/intro-01.svg";
import ***REMOVED*** useTranslation ***REMOVED*** from 'react-i18next';
import ***REMOVED*** isMobile ***REMOVED*** from "react-device-detect";

let styled = ***REMOVED******REMOVED***;
if(isMobile)***REMOVED***
  styled = ***REMOVED***
    indexMenu: ***REMOVED***
      margin: 26,
      "& a": ***REMOVED***
        margin: 12
***REMOVED***
***REMOVED***
    container: ***REMOVED***
      padding: 20,
      height: "100%",
      textAlign: "center"
***REMOVED***
    svgWrapper: ***REMOVED***
      alignItems:"center",
      justifyContent:"center",
      textAlign: "center"
***REMOVED***
    introSvg: ***REMOVED***
      width: "100%"
***REMOVED***
***REMOVED***;
***REMOVED***else***REMOVED***
  styled = ***REMOVED***
    indexMenu: ***REMOVED***
      margin: 26,
      "& a": ***REMOVED***
        margin: 12
***REMOVED***
***REMOVED***
    container: ***REMOVED***
      padding: 20,
      height: "100%",
      textAlign: "center"
***REMOVED***
    svgWrapper: ***REMOVED***
      alignItems:"center",
      justifyContent:"center",
      textAlign: "center"
***REMOVED***
    introSvg: ***REMOVED***
      width: "60%"
***REMOVED***
***REMOVED***;
***REMOVED***
const useStyles = makeStyles(styled);
function IndexPage() ***REMOVED***
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const ***REMOVED*** t ***REMOVED*** = useTranslation();
  const transitions = useTransition(!redirect, null, ***REMOVED***
    from: ***REMOVED*** opacity: 0 ***REMOVED***,
    enter: ***REMOVED*** opacity: 1 ***REMOVED***,
    leave: ***REMOVED*** opacity: 0 ***REMOVED***,
    config: config.stiff
***REMOVED***);

  useEffect(() => ***REMOVED***
    function handleKeyDown(evt) ***REMOVED***
      if (evt.code === "Enter" || evt.code === "Space") ***REMOVED***
        setRedirect(true);
***REMOVED***
***REMOVED***
    document.body.addEventListener("keydown", handleKeyDown);
    return () => ***REMOVED***
      document.body.removeEventListener("keydown", handleKeyDown);
***REMOVED***;
***REMOVED***, []);

  return redirect && transitions.length === 1 ? (
    <Redirect to="/lobby" />
  ) : (
  
    transitions.map(
      (***REMOVED*** item, key, props ***REMOVED***) => item && (
        <Container key=***REMOVED***key***REMOVED***>
          <animated.div key=***REMOVED***key***REMOVED*** style=***REMOVED***props***REMOVED***>
            <div className=***REMOVED***classes.svgWrapper***REMOVED***>
              <img alt="" className=***REMOVED***classes.introSvg***REMOVED*** src=***REMOVED***Intro***REMOVED*** />
            </div>
            <Container className=***REMOVED***classes.container***REMOVED***>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick=***REMOVED***() => setRedirect(true)***REMOVED***
              >
                <Typography>Start</Typography>
              </Button>
              <Typography variant="subtitle1">
                <div className=***REMOVED***classes.indexMenu***REMOVED***>
                  <Link component=***REMOVED***RouterLink***REMOVED*** to="/help">
                    ***REMOVED***t("fpHelp")***REMOVED***
                  </Link>
                  <Link component=***REMOVED***RouterLink***REMOVED*** to="/about">
                    ***REMOVED***t("fpAbout")***REMOVED***
                  </Link>
                  <Link component=***REMOVED***RouterLink***REMOVED*** to="/credits">
                    ***REMOVED***t("fpCredits")***REMOVED***
                  </Link>
                  <Link component=***REMOVED***RouterLink***REMOVED*** to="/contact">
                    ***REMOVED***t("fpContact")***REMOVED***
                  </Link>
                </div>
              </Typography>
            </Container>
          </animated.div>
        </Container>
      )
    )

  );
***REMOVED***

export default IndexPage;
