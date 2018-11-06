import React from 'react';
import PropTypes from 'prop-types';

function TransitionComponent(props) {
  // Moves state to the next page
  return (
    <button className={(props.className !== undefined ? props.className + " " : "") + "transitionButton"}
            onClick={(e) => props.onChange(props.toNum)}>
      {props.content}
    </button>
  );
}

TransitionComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
  toNum: PropTypes.number,
  content: PropTypes.string
};

export default TransitionComponent;
