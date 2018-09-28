import React from 'react';
import PropTypes from 'prop-types';

function TimePicker(props) {
  function onChangeHour(e) {
    props.stateFunction({
      timeStartedHour: parseInt(e.target.value, 10)
    });
  }

  function onChangeMinute(e) {
    props.stateFunction({
      timeStartedMinute: parseInt(e.target.value, 10)
    });
  }

  function onChangeAmPm(e) {
    props.stateFunction({
      timeStartedAmPm: e.target.value
    });
  }

  return (
    <div className="TimePicker">
      <input className="hour-input" value={props.state.timeStartedHour} onChange={(e) => onChangeHour(e)} type="number" min="1" max="12" />
      &nbsp;
      <input
        className="minute-input"
        value={(props.state.timeStartedMinute < 10) ? "0" + props.state.timeStartedMinute : props.state.timeStartedMinute}
        onChange={(e) => onChangeMinute(e)}
        type="number"
        min="0"
        max="59"
      />
      &nbsp;
      <select className="ampm-input"
        value={props.state.timeStartedAmPm}
        onChange={(e) => onChangeAmPm(e)}
      >
        <option value="am">am</option>
        <option value="pm">pm</option>
      </select>
    </div>
  );
}
TimePicker.propTypes = {
  stateFunction: PropTypes.func.isRequired
};

export default TimePicker;
