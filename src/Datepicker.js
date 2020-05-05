import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import { KeyboardDatePicker } from "@material-ui/pickers";
import PropTypes from "prop-types";

export default function DatePickerField(props) {
  const { value, onChange, ...rest } = props;
  const [selectedDate, setSelectedDate] = React.useState(value || null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onChange(date);
  };

  console.log(selectedDate);
  return (
    <Grid container justify="space-around">
      <KeyboardDatePicker
        margin="normal"
        format="dd/MM/yyyy"
        value={selectedDate}
        onChange={handleDateChange}
        {...rest}
      />
    </Grid>
  );
}

DatePickerField.propTypes = {
  onChange: PropTypes.func.isRequired,
};
