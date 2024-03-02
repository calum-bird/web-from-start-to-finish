import { forwardRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  FormGroup,
  Slider,
  TextField,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewEntry(props) {
  const { open, cancel, addEntryAndClose } = props;
  const [feelingScaleValue, setFeelingScaleValue] = useState(5);
  const [notes, setNotes] = useState("");

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={cancel}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flex: 1 }}>
            New Entry
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={cancel}
            aria-label="Cancel"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>
        <FormGroup>
          <TextField
            label="How are you feeling today?"
            variant="outlined"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            Today I am feeling like a {feelingScaleValue} out of 10
          </Typography>
          <Slider
            aria-label="Feeling on a scale of 1 to 10"
            defaultValue={5}
            value={feelingScaleValue}
            onChange={(_, value) => setFeelingScaleValue(value)}
            getAriaValueText={() =>
              "Today I am feeling like a " + feelingScaleValue + " out of 10"
            }
            valueLabelDisplay="auto"
            size="medium"
            shiftStep={1}
            valueLabelFormat={(value) => value + "/10"}
            step={1}
            marks
            min={1}
            max={10}
          />
          <Button
            variant="contained"
            color="primary"
            size="medium"
            sx={{ maxWidth: 200, mt: 3 }}
            onClick={() => {
              const today = new Date();
              addEntryAndClose({
                createdAt: today.toISOString(),
                feeling: feelingScaleValue,
                notes,
              });
            }}
          >
            Save Entry
          </Button>
        </FormGroup>
      </Box>
    </Dialog>
  );
}
