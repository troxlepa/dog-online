import React from "react";
import clsx from "clsx";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import ***REMOVED*** amber, green ***REMOVED*** from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import ***REMOVED*** makeStyles ***REMOVED*** from "@material-ui/core/styles";

const variantIcon = ***REMOVED***
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
***REMOVED***;

const useStyles = makeStyles(theme => (***REMOVED***
  success: ***REMOVED***
    backgroundColor: green[600]
***REMOVED***,
  error: ***REMOVED***
    backgroundColor: theme.palette.error.dark
***REMOVED***,
  info: ***REMOVED***
    backgroundColor: theme.palette.primary.main
***REMOVED***,
  warning: ***REMOVED***
    backgroundColor: amber[700]
***REMOVED***,
  icon: ***REMOVED***
    fontSize: 20
***REMOVED***,
  iconVariant: ***REMOVED***
    opacity: 0.9,
    marginRight: theme.spacing(1)
***REMOVED***,
  message: ***REMOVED***
    display: "flex",
    alignItems: "center"
***REMOVED***
***REMOVED***));

function SnackContent(props) ***REMOVED***
  const classes = useStyles();
  const ***REMOVED*** className, message, onClose, variant, ...other ***REMOVED*** = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className=***REMOVED***clsx(classes[variant], className)***REMOVED***
      aria-describedby="client-snackbar"
      message=***REMOVED***
        <span id="client-snackbar" className=***REMOVED***classes.message***REMOVED***>
          <Icon className=***REMOVED***clsx(classes.icon, classes.iconVariant)***REMOVED*** />
          ***REMOVED***message***REMOVED***
        </span>
***REMOVED***
      action=***REMOVED***[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick=***REMOVED***onClose***REMOVED***
        >
          <CloseIcon className=***REMOVED***classes.icon***REMOVED*** />
        </IconButton>
      ]***REMOVED***
      ***REMOVED***...other***REMOVED***
    />
  );
***REMOVED***

export default SnackContent;
