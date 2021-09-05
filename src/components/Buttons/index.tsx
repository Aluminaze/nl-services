import React from "react";
import { withStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { grey } from "@material-ui/core/colors";

const ColorBlackButton = withStyles((theme: Theme) => ({
  root: {
    color: "white",
    backgroundColor: grey[800],
    "&:hover": {
      backgroundColor: grey[900],
    },
  },
}))(Button);

const useStyles = makeStyles((theme: Theme) => ({
  btnLabel: {
    fontSize: ".85rem",

    [theme.breakpoints.down("sm")]: {
      fontSize: ".7rem",
    },
  },
}));

interface ButtonProps {
  children?: any;
  size?: "large" | "medium" | "small";
  label: string;
  variant?: "contained" | "outlined" | "text";
  disabled?: boolean;
  onClick: () => void;
}

export const ButtonBlack = (props: ButtonProps): JSX.Element => {
  const {
    size = "medium",
    label,
    variant = "outlined",
    disabled = false,
    onClick,
  } = props;
  const classes = useStyles();

  return (
    <ColorBlackButton
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={classes.btnLabel}>{label}</span>
    </ColorBlackButton>
  );
};
