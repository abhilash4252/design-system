import React, { Component } from "react";
import PropTypes from "prop-types";

import { Checkbox } from "../../";

class FilterCheckbox extends Component {
  static propTypes = {
    value: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func
  };

  handleOnClick = event => {
    const { onChange } = this.props;
    const { checked } = event.target;

    onChange(checked ? checked : undefined);
  };

  render() {
    const { value, name } = this.props;

    return (
      <Checkbox checked={value} onChange={this.handleOnClick} className="w-100">
        {name}
      </Checkbox>
    );
  }
}

export default FilterCheckbox;
