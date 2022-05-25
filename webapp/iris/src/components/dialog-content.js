import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

/**
 * Function to declare dialog box
 */
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

/**
 * Function to set the title of the dialog box
 * @param {*} props
 * @returns
 */
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs(props) {
  const handleClose = () => {
    const closeHandler = props.closeHandle;
    console.log(props.content);
    closeHandler(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Caller Vitals
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className="card-content">
            <h3>Name: {props.content.name}</h3>
            <div className="card-row">
              <div>
                <h4>Blood Group</h4>
                <p>{props.content.bloodGroup}</p>
              </div>
              <div>
                <h4>Height</h4>
                <p>{props.content.height}</p>
              </div>
              <div>
                <h4>Weight</h4>
                <p>{props.content.weight}</p>
              </div>
            </div>
            <h3>Caller Vitals</h3>
            <div>
              <div className="card-row">
                <img src="../assets/O2.jpg" alt="oxy-level" />
                <h1>{props.content.vitals?.oxygenLevel}</h1>
                <h4>Oxygen Level</h4>
              </div>
              <div className="card-row">
                <img src="../assets/body-temp.jpg" alt="body-temp" />
                <h1>{props.content.vitals?.temperature}</h1>
                <h4>Temperature</h4>
              </div>
              <div className="card-row">
                <img src="../assets/heart-rate.jpg" alt="heart-rate" />
                <h1>{props.content.vitals?.heartRate}</h1>
                <h4>Heart Rate</h4>
              </div>
              <div className="card-row">
                <img src="../assets/bp.jpg" alt="BP" />
                <h1>{props.content.vitals?.diastolic}/{props.content.vitals?.systolic}</h1>
                <h4>Blood Pressure</h4>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            OK
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
