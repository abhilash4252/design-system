import React, { Component } from "react";
import PropTypes from "prop-types";

import { Radio, Row, Col } from "../../";

export class FilterRadioGroup extends Component {
  static propTypes = {
    options: PropTypes.array,
    value: PropTypes.string,
    onChange: PropTypes.func
  };

  handleOnChange = event => {
    const { onChange } = this.props;

    const { value } = event.target;

    onChange(value ? value : undefined);
  };

  render() {
    const { options, value } = this.props;
    return (
      <Radio.Group
        onChange={this.handleOnChange}
        value={value}
        className="w-100"
      >
        <Row>
          {options.map((option, index) => {
            const className =
              index === 0 || index === options - 1 ? "" : "mt-10";

            return (
              <Col key={option} className={className}>
                <Radio value={option} className="w-100">
                  {option}
                </Radio>
              </Col>
            );
          })}
        </Row>
      </Radio.Group>
    );
  }
}

export default FilterRadioGroup;
