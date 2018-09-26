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
    <div>
      <input onChange={(e) => onChangeHour(e)} type="number" min="1" max="12" />
      <input onChange={(e) => onChangeMinute(e)} type="number" min="0" max="59" />
      <select onChange={(e) => onChangeAmPm(e)}>
        <option value="am">am</option>
        <option value="pm">pm</option>
      </select>
    </div>
  );
}
TimePicker.propTypes = {
  stateFunction: PropTypes.object.isRequired
};

export default TimePicker;
