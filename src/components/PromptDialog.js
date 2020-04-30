import React, ***REMOVED*** useState ***REMOVED*** from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function PromptDialog(props) ***REMOVED***
  const ***REMOVED*** open, onClose, title, message, label, maxLength ***REMOVED*** = props;
  const [value, setValue] = useState("");

  function handleClose() ***REMOVED***
    onClose(null);
    setValue("");
***REMOVED***

  function handleSubmit() ***REMOVED***
    onClose(value);
    setValue("");
***REMOVED***

  function handleKeyDown(event) ***REMOVED***
    if (event.key === "Enter") ***REMOVED***
      handleSubmit();
***REMOVED***
***REMOVED***

  return (
    <Dialog open=***REMOVED***open***REMOVED*** onClose=***REMOVED***handleClose***REMOVED***>
      <DialogTitle>***REMOVED***title***REMOVED***</DialogTitle>
      <DialogContent>
        <DialogContentText>***REMOVED***message***REMOVED***</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label=***REMOVED***label***REMOVED***
          type="text"
          fullWidth
          value=***REMOVED***value***REMOVED***
          onChange=***REMOVED***e => setValue(e.target.value)***REMOVED***
          variant="outlined"
          onKeyDown=***REMOVED***handleKeyDown***REMOVED***
          inputProps=***REMOVED******REMOVED*** maxLength ***REMOVED******REMOVED***
        />
      </DialogContent>
      <DialogActions>
        <Button onClick=***REMOVED***handleClose***REMOVED*** color="primary">
          Cancel
        </Button>
        <Button onClick=***REMOVED***handleSubmit***REMOVED*** variant="contained" color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
***REMOVED***

export default PromptDialog;
