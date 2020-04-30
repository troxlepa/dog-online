import React, ***REMOVED*** useEffect, useState, useRef, memo ***REMOVED*** from "react";

import ***REMOVED*** makeStyles ***REMOVED*** from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import ForumIcon from "@material-ui/icons/Forum";
import SendIcon from "@material-ui/icons/Send";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ***REMOVED*** animated, useSpring ***REMOVED*** from "react-spring";

import firebase from "../firebase";
import Loading from "./Loading";
import autoscroll from "../utils/autoscroll";

const CHAT_HEIGHT = 480;

const useStyles = makeStyles(theme => (***REMOVED***
  chatContainer: ***REMOVED***
    position: "fixed",
    bottom: 0,
    left: 16,
    width: 280,
    zIndex: 1
***REMOVED***,
  chatHeader: ***REMOVED***
    padding: 12,
    fontSize: "1.4rem",
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    cursor: "pointer",
    "& > div": ***REMOVED***
      display: "flex",
      alignItems: "center"
***REMOVED***
***REMOVED***,
  chatAvatar: ***REMOVED***
    marginRight: 10
***REMOVED***,
  badge: ***REMOVED***
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    borderRadius: 5,
    padding: "1px 5px",
    fontSize: "1.25rem",
    marginLeft: 14
***REMOVED***,
  content: ***REMOVED***
    height: CHAT_HEIGHT,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    padding: "0 !important"
***REMOVED***,
  chatArea: ***REMOVED***
    flexGrow: 1,
    overflowX: "hidden",
    overflowY: "auto",
    padding: 6,
    textAlign: "left"
***REMOVED***,
  chatInput: ***REMOVED***
    flexShrink: 0,
    height: 64,
    padding: 6,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
***REMOVED***
***REMOVED***));

function Chat(***REMOVED*** chatId, user ***REMOVED***) ***REMOVED***
  const classes = useStyles();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(null);
  const [open, setOpen] = useState(false);
  const [read, setRead] = useState(0);
  const chatAreaEl = useRef(null);
  const springProps = useSpring(***REMOVED***
    transform: `translateY($***REMOVED***open ? 0 : CHAT_HEIGHT***REMOVED***px)`
***REMOVED***);

  useEffect(() => ***REMOVED***
    const chatRef = firebase.database().ref(`chats/$***REMOVED***chatId***REMOVED***`);
    function update(snapshot) ***REMOVED***
      const items = [];
      snapshot.forEach(child => ***REMOVED***
        items.push(child.val());
***REMOVED***);
      setMessages(items);
      if (open) ***REMOVED***
        setRead(items.length);
***REMOVED***
***REMOVED***
    chatRef.on("value", update);
    return () => ***REMOVED***
      chatRef.off("value", update);
***REMOVED***;
***REMOVED***, [chatId, open]);

  useEffect(() => ***REMOVED***
    return autoscroll(chatAreaEl.current);
***REMOVED***, []);

  function handleShow() ***REMOVED***
    if (!open) ***REMOVED***
      setRead(messages.length);
***REMOVED***
    setOpen(!open);
***REMOVED***

  function handleSubmit(event) ***REMOVED***
    event.preventDefault();
    if (input) ***REMOVED***
      firebase
        .database()
        .ref(`chats/$***REMOVED***chatId***REMOVED***`)
        .push(***REMOVED***
          user: user.name,
          message: input
***REMOVED***);
***REMOVED***
    setInput("");
***REMOVED***

  return (
    <animated.div className=***REMOVED***classes.chatContainer***REMOVED*** style=***REMOVED***springProps***REMOVED***>
      <Card elevation=***REMOVED***2***REMOVED***>
        <CardHeader
          disableTypography
          avatar=***REMOVED***<ForumIcon size="small" />***REMOVED***
          title=***REMOVED***
            <>
              Chat
              ***REMOVED***messages && messages.length > read && (
                <span className=***REMOVED***classes.badge***REMOVED***>***REMOVED***messages.length - read***REMOVED***</span>
              )***REMOVED***
            </>
***REMOVED***
          className=***REMOVED***classes.chatHeader***REMOVED***
          classes=***REMOVED******REMOVED*** avatar: classes.chatAvatar ***REMOVED******REMOVED***
          onClick=***REMOVED***handleShow***REMOVED***
        />
        <CardContent className=***REMOVED***classes.content***REMOVED***>
          <div className=***REMOVED***classes.chatArea***REMOVED*** ref=***REMOVED***chatAreaEl***REMOVED***>
            ***REMOVED***messages ? (
              messages.map((msg, i) => (
                <Typography key=***REMOVED***i***REMOVED*** gutterBottom>
                  <b>***REMOVED***msg.user***REMOVED***:</b> ***REMOVED***msg.message***REMOVED***
                </Typography>
              ))
            ) : (
              <Loading />
            )***REMOVED***
          </div>
          <Divider />
          <form className=***REMOVED***classes.chatInput***REMOVED*** onSubmit=***REMOVED***handleSubmit***REMOVED***>
            <TextField
              variant="outlined"
              margin="none"
              size="small"
              label="Message"
              value=***REMOVED***input***REMOVED***
              onChange=***REMOVED***e => setInput(e.target.value)***REMOVED***
            />
            <Button variant="contained" color="primary" type="submit">
              <SendIcon style=***REMOVED******REMOVED*** fontSize: "1.68rem" ***REMOVED******REMOVED*** />
            </Button>
          </form>
        </CardContent>
      </Card>
    </animated.div>
  );
***REMOVED***

export default memo(Chat);
