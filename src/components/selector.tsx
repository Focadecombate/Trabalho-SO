import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";

interface Props {
  values: string[];
  state: string;
  handleChange(event: any): void;
  label: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

export const Selector = ({ values, state, label, handleChange }: Props) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      <Select value={state} onChange={handleChange}>
        {values.map((arrayValue) => (
          <MenuItem value={arrayValue}>{arrayValue}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
