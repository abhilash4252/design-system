import React, { Component } from "react";
import PropTypes from "prop-types";

import { Checkbox } from "../../";

class FilterCheckboxGroup extends Component {
  static propTypes = {
    options: PropTypes.array,
    value: PropTypes.array,
    onChange: PropTypes.func
  };

  handleOnChange = checkedValues => {
    const { onChange } = this.props;

    if (checkedValues.length) {
      onChange(checkedValues);
    } else {
      onChange(undefined);
    }
  };

  render() {
    const { options, value } = this.props;

    return (
      <Checkbox.Group
        value={value}
        onChange={this.handleOnChange}
        className="filter-checkbox-group"
        style={{ width: "100%" }}
      >
        {options.map((option, index) => {
          const className = index === 0 || index === options - 1 ? "" : "mt-10";
          return (
            <Checkbox
              key={option}
              value={option}
              className={`${className} w-100`}
            >
              {option}
            </Checkbox>
          );
        })}
      </Checkbox.Group>
    );
  }
}

export default FilterCheckboxGroup;
