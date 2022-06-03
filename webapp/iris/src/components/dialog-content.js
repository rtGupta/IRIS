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
          <strong>Caller Vitals</strong>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className="card-content">
            <h3>Name: {props.content.name}</h3>
            <div className="vitals-card">
              <div className="vitals-icon">
                <img src="../assets/bp.png" />
              </div>
              <div className="vitals-card-content">
                <h4>Blood Pressure</h4>
                <div className="vitals-value">
                  <span className="value">
                    {props.content.vitals?.diastolic}/
                    {props.content.vitals?.systolic}
                  </span>
                  <span className="unit">mm/Hg</span>
                </div>
              </div>
            </div>
            <div className="vitals-card">
              <div className="vitals-icon">
                <img src="../assets/temp.png" />
              </div>
              <div className="vitals-card-content">
                <h4>Body Temperature</h4>
                <div className="vitals-value">
                  <span className="value">
                    {props.content.vitals?.temperature}
                  </span>
                  <span className="unit">Degree</span>
                </div>
              </div>
            </div>
            <div className="vitals-card">
              <div className="vitals-icon">
                <img src="../assets/heart-rate.png" />
              </div>
              <div className="vitals-card-content">
                <h4>Heart Rate</h4>
                <div className="vitals-value">
                  <span className="value">
                    {props.content.vitals?.heartRate}
                  </span>
                  <span className="unit">bpm</span>
                </div>
              </div>
            </div>
            <div className="vitals-card">
              <div className="vitals-icon">
                <img src="../assets/oxygen.png" />
              </div>
              <div className="vitals-card-content">
                <h4>
                  SpO<sub>2</sub>
                </h4>
                <div className="vitals-value">
                  <span className="value">
                    {props.content.vitals?.oxygenLevel}
                  </span>
                  <span className="unit">%</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} className="btn-ok">
            OK
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
