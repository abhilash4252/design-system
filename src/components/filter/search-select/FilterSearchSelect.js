import React, { Component } from "react";
import PropTypes from "prop-types";

import { Select } from "../../";

const { Option } = Select;

export class FilterSearchSelect extends Component {
  static propTypes = {
    options: PropTypes.array,
    filterKey: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.array,
    onChange: PropTypes.func
  };

  handleChange = value => {
    const { onChange } = this.props;

    if (value.length) {
      onChange(value);
    } else {
      onChange(undefined);
    }
  };

  render() {
    const { options, value, filterKey, placeholder } = this.props;
    return (
      <div id={`select-filter-${filterKey}`}>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder={placeholder}
          onChange={this.handleChange}
          value={value}
          getPopupContainer={() =>
            document.getElementById(`select-filter-${filterKey}`)
          }
        >
          {options.map(option => {
            return (
              <Option key={option} value={option}>
                {option}
              </Option>
            );
          })}
        </Select>
      </div>
    );
  }
}

export default FilterSearchSelect;
