import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FilterSelectedViewTag from "./tag/FilterSelectedViewTag";

import "./FilterSelectedView.scss";

import { Row, Col } from "../../";

export class FilterSelectedView extends Component {
  static propTypes = {
    selectedFilters: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    onCurrentOpenFilterChange: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onCloseAll: PropTypes.func
  };

  static defaultProps = {
    disabled: false,
    onCloseAll: () => {}
  };

  handleCloseAll = () => {
    const { onCloseAll, onChange } = this.props;
    onChange({ selectedFilters: {} });
    onCloseAll();
  };

  handleOnClick = filterKey => {
    const { onCurrentOpenFilterChange } = this.props;
    onCurrentOpenFilterChange(filterKey);
  };

  handleOnClose = filterKey => {
    const { onChange, onCloseAll } = this.props;

    let selectedFilters = this.getSelectedFilters();

    delete selectedFilters[filterKey];
    onChange({ selectedFilters, filterKey });
    if (Object.keys(selectedFilters).length === 0) {
      onCloseAll();
    }
  };

  getSelectedFilters = () => {
    const { selectedFilters } = this.props;

    const filters = {};

    Object.entries(selectedFilters).forEach(([filterKey, filterValue]) => {
      if (filterValue.value !== undefined) {
        filters[filterKey] = filterValue;
      }
    });

    return filters;
  };

  render() {
    const selectedFilters = this.getSelectedFilters();

    if (Object.keys(selectedFilters).length === 0) {
      return null;
    }

    return (
      <div className="platform-filter-selected-view tags-container">
        <Row type="flex" justify="space-between" align="middle">
          <Col span={23}>
            {Object.entries(selectedFilters).map(([filterKey, filterValue]) => {
              return (
                <FilterSelectedViewTag
                  key={filterKey}
                  filterKey={filterKey}
                  name={filterValue.name}
                  value={filterValue.value}
                  component={filterValue.component}
                  onClick={this.handleOnClick}
                  onClose={this.handleOnClose}
                />
              );
            })}
          </Col>
          <Col span={1} style={{ textAlign: "center" }}>
            <span className="tags-clear" onClick={this.handleCloseAll}>
              <FontAwesomeIcon icon="times" />
            </span>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FilterSelectedView;
