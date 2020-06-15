import * as React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "./request.component.css";
import { useHistory } from "react-router";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  TextareaAutosize,
  Select,
  InputLabel,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { createTicket } from "../../remote/auth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(3),
        width: theme.spacing(16),
      },
    },
  })
);

const useStyl = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: "none",
    },
  })
);

export const RequestComponent: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState();
  const [amount, setAmount] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const date = new Date();
  const classes = useStyles();
  const clas = useStyl();
  const history = useHistory();
  const handleClick = () => {
    history.push("/portal");
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event: any) => {
    setType(event.target.value);
  };

  const handleSubmit = () => {
    const info = { amount, desc, type };
    createTicket(info);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          id="open-form"
        >
          You may submit a reimbursement request by clicking here. Please make
          sure to enter the correct information, as any mistakes noticed after
          submission would need to be verified by a manager and may result in
          delays.
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          id="form-content"
        >
          <DialogTitle id="alert-dialog-title">
            {<span id="head-text">NOTE!!! ALL FIELDS ARE REQUIRED.</span>}
          </DialogTitle>
          <DialogContent id="form-text">
            <DialogContentText id="alert-dialog-description">
              <TextField
                id="outlined-full-width"
                label="Amount"
                type="number"
                style={{ margin: 8 }}
                placeholder="Amount"
                fullWidth
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                color="secondary"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: "0",
                }}
                variant="outlined"
                required
              />
              <div>
                <TextField
                  disabled
                  id="outlined-disabled"
                  fullWidth
                  label="Current Time and Date"
                  defaultValue={date.toUTCString()}
                  variant="outlined"
                  color="secondary"
                  margin="normal"
                  style={{ margin: 8 }}
                />
              </div>
              <div className={clas.root}>
                <input
                  accept="image/*"
                  className={clas.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="contained-button-file">
                  <Button
                    id="upload"
                    variant="contained"
                    component="span"
                    color="secondary"
                  >
                    Upload
                  </Button>
                </label>
                <input
                  disabled
                  accept="image/*"
                  className={clas.input}
                  id="icon-button-file"
                  type="file"
                />
                <label htmlFor="icon-button-file">
                  <IconButton
                    id="upload"
                    color="secondary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
                <div>
                  <TextareaAutosize
                    aria-label="Description"
                    rowsMin={7}
                    cols={73}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Briefly explain what the request is about."
                  />
                </div>
                <div>
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Select Type
                  </InputLabel>
                  <Select
                    native
                    fullWidth
                    value={type}
                    onChange={handleChange}
                    variant="outlined"
                    color="secondary"
                    label="Reimbursement Type"
                    placeholder="Type"
                    required
                    inputProps={{
                      name: "type",
                      id: "outlined-age-native-simple",
                    }}
                  >
                    <option aria-label="None" value="" id="o" />
                    <option value={1} id="o">
                      FOOD
                    </option>
                    <option value={2} id="o">
                      LODGING
                    </option>
                    <option value={3} id="o">
                      OTHER
                    </option>
                    <option value={4} id="o">
                      TRAVEL
                    </option>
                  </Select>
                </div>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions id="form-buttons">
            <Button
              onClick={handleClose}
              variant="contained"
              color="secondary"
              id="cancel"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="secondary"
              autoFocus
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className={classes.root}>
        <Button
          variant="contained"
          color="secondary"
          id="portal-button"
          onClick={() => handleClick()}
        >
          Return To Portal
        </Button>
      </div>
    </React.Fragment>
  );
};
