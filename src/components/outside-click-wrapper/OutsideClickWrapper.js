import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

/*
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, disabled, onOutsideClick) {
  /**
   * Alert if clicked on outside of element
   */

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick(event);
      }
    }
    // Bind the event listener
    if (!disabled) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  });
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideClickWrapper(props) {
  const wrapperRef = useRef(null);
  const { disabled, onOutsideClick, display } = props;
  useOutsideAlerter(wrapperRef, disabled, onOutsideClick);

  return (
    <div ref={wrapperRef} style={{ display: display }}>
      {props.children}
    </div>
  );
}

OutsideClickWrapper.propTypes = {
  children: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  display: PropTypes.oneOf(["block", "flex", "inline-block", "inline"]),
  onOutsideClick: PropTypes.func.isRequired
};

OutsideClickWrapper.defaultProps = {
  disabled: true,
  display: "inline"
};

export default OutsideClickWrapper;
