import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './FilterSelectedViewTag.scss';
import { filterItemComponents } from '../../filterConstants';

export class FilterSelectedViewTag extends Component {
  static propTypes = {
    filterKey: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.any,
    component: PropTypes.string,
    onClick: PropTypes.func,
    onClose: PropTypes.func
  };

  handleOnClick = () => {
    const { filterKey, onClick } = this.props;
    onClick(filterKey);
  };

  handleOnClose = () => {
    const { filterKey, onClose } = this.props;
    onClose(filterKey);
  };

  getValue = () => {
    const { value, component } = this.props;

    let FilterValue = value;
    if (component === filterItemComponents.checkbox) {
      FilterValue = null;
    } else if (Array.isArray(value)) {
      FilterValue = value.join(', ');
    } else if (typeof value === 'boolean') {
      FilterValue = value ? 'Yes' : 'No';
    }

    return FilterValue;
  };

  render() {
    const { name } = this.props;
    const value = this.getValue();

    return (
      <div className="filter-selected-view-tag">
        <span className="filter-tag-text" onClick={this.handleOnClick}>
          <span className="filter-tag-name">{name} </span>
          <span className="filter-tag-value">{value}</span>
        </span>
        <span className="filter-tag-close" onClick={this.handleOnClose}>
          <FontAwesomeIcon icon="times" />
        </span>
      </div>
    );
  }
}

export default FilterSelectedViewTag;
