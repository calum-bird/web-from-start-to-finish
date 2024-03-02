import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewEntry(props) {
  const { cancel, handleSave, open } = props;
  const [feelingNotes, setFeelingNotes] = React.useState("");
  const [feelingRating, setFeelingRating] = React.useState(5);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={cancel}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <Typography variant="h3">New Entry</Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={cancel}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <TextField
        label="How are you feeling today?"
        variant="outlined"
        value={feelingNotes}
        onChange={(e, text) => setFeelingNotes(text)}
      />
      <Slider
        defaultValue={feelingRating}
        aria-label="Default"
        valueLabelDisplay="auto"
        onChange={(e) => setFeelingRating(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={() => {
          handleSave({
            createdAt: new Date(),
            notes: feelingNotes,
            rating: feelingRating,
          });
        }}
      >
        Save
      </Button>
    </Dialog>
  );
}
