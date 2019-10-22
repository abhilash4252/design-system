import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Tag, Row, Col, Typography } from "../../";
import {
  getTotalSelectedFilterCount,
  getSelectedFilterCountList,
  getFilterPathKeys
} from "../filterUtils";
import { filterItemComponents } from "../filterConstants";
import FilterCheckbox from "../checkbox/FilterCheckbox";
import FilterCheckboxGroup from "../checkbox-group/FilterCheckboxGroup";
import FilterSearchSelect from "../search-select/FilterSearchSelect";
import FilterRadioGroup from "../radio-group/FilterRadioGroup";

const isFilterOpen = (filterKey, currentOpenFilter, items) => {
  const filterKeyPath = getFilterPathKeys(items, currentOpenFilter);
  return filterKeyPath.includes(filterKey);
};

const SelectedFilterCountTag = ({ filterKey, items, selectedFilters }) => {
  const selectedFilterCount = getSelectedFilterCountList(
    items,
    selectedFilters
  )[filterKey];

  if (selectedFilterCount) {
    return (
      <Tag className="individual-filter-count">
        <span className="individual-filter-item">{selectedFilterCount}</span>
      </Tag>
    );
  } else {
    return null;
  }
};

SelectedFilterCountTag.propTypes = {
  filterKey: PropTypes.string,
  items: PropTypes.array,
  currentOpenFilter: PropTypes.string
};

const SelectedFilter = ({ items, selectedFilters, onCloseAll }) => {
  const selectedFilterCount = getTotalSelectedFilterCount(
    items,
    selectedFilters
  );

  const handleOnCloseAll = () => {
    onCloseAll();
  };

  return (
    <li className="dropdown-item-content">
      <Row type="flex" justify="space-between">
        <Col>
          <span className="mr-2">
            <Typography.Text strong={true}>SELECTED</Typography.Text>
          </span>
          {selectedFilterCount ? (
            <Tag className="selected-filter-count-indicator">
              <span className="selected-filter-item">
                {selectedFilterCount}
              </span>
            </Tag>
          ) : null}
        </Col>
        <Col>
          <a onClick={handleOnCloseAll}>CLEAR</a>
        </Col>
      </Row>
    </li>
  );
};

SelectedFilter.propTypes = {
  items: PropTypes.array,
  selectedFilters: PropTypes.object,
  onCloseAll: PropTypes.func
};

const FilterItem = ({ filter, selectedFilters, onChange }) => {
  let filterItem;

  const handleOnChange = value => {
    if (value === undefined) {
      onChange(filter.key, undefined);
    } else {
      onChange(filter.key, {
        value,
        name: filter.name,
        component: filter.component
      });
    }
  };

  const value = selectedFilters[filter.key]
    ? selectedFilters[filter.key].value
    : undefined;

  switch (filter.component) {
    case filterItemComponents.checkbox: {
      filterItem = (
        <FilterCheckbox
          value={value}
          name={filter.name}
          onChange={handleOnChange}
        />
      );
      break;
    }

    case filterItemComponents.checkboxGroup: {
      filterItem = (
        <li className="dropdown-item" key={filter.name}>
          <div className="dropdown-item-content">
            <FilterCheckboxGroup
              value={value}
              onChange={handleOnChange}
              options={filter.options}
            />
          </div>
        </li>
      );
      break;
    }
    case filterItemComponents.radioGroup: {
      filterItem = (
        <li className="dropdown-item" key={filter.name}>
          <div className="dropdown-item-content">
            <FilterRadioGroup
              value={value}
              onChange={handleOnChange}
              options={filter.options}
            />
          </div>
        </li>
      );
      break;
    }
    case filterItemComponents.searchSelect: {
      filterItem = (
        <li className="dropdown-item" key={filter.name}>
          <div className="dropdown-item-content">
            <FilterSearchSelect
              value={value}
              filterKey={filter.key}
              placeholder={filter.placeholder}
              onChange={handleOnChange}
              options={filter.options}
            />
          </div>
        </li>
      );
      break;
    }

    default: {
      filterItem = null;
    }
  }

  return filterItem;
};

FilterItem.propTypes = {
  filter: PropTypes.object,
  selectedFilters: PropTypes.object,
  onChange: PropTypes.func
};

const FilterItemContainer = ({
  filter,
  items,
  currentOpenFilter,
  selectedFilters,
  onCurrentOpenFilterChange,
  onChange
}) => {
  if (filter.component === filterItemComponents.checkbox) {
    return (
      <li className="dropdown-item" key={filter.name}>
        <div
          className="dropdown-item-content"
          onClick={() => {
            onCurrentOpenFilterChange(filter.key);
          }}
        >
          <FilterItem
            filter={filter}
            selectedFilters={selectedFilters}
            onChange={onChange}
          />
        </div>
      </li>
    );
  } else if (filter.children) {
    return (
      <ul>
        <FilterSubMenuItem
          filter={filter}
          items={items}
          currentOpenFilter={currentOpenFilter}
          selectedFilters={selectedFilters}
          onCurrentOpenFilterChange={onCurrentOpenFilterChange}
          onChange={onChange}
        />
      </ul>
    );
  } else {
    const isOpen = isFilterOpen(filter.key, currentOpenFilter, items);
    return (
      <li className="dropdown-item" key={filter.name}>
        <div
          className={`dropdown-item-content ${isOpen ? "selected" : ""}`}
          onClick={() => {
            onCurrentOpenFilterChange(filter.key);
          }}
        >
          <span>
            <span className="mr-2">{filter.name}</span>
            <SelectedFilterCountTag
              filterKey={filter.key}
              items={items}
              selectedFilters={selectedFilters}
            />
          </span>
          <span className="float-right">
            <FontAwesomeIcon icon="angle-right" />
          </span>
        </div>
        <ul className={`dropdown-submenu ${isOpen ? "open" : ""}`}>
          <FilterItem
            filter={filter}
            selectedFilters={selectedFilters}
            onChange={onChange}
          />
        </ul>
      </li>
    );
  }
};

FilterItemContainer.propTypes = {
  filter: PropTypes.object,
  items: PropTypes.array,
  selectedFilters: PropTypes.object,
  currentOpenFilter: PropTypes.string,
  onChange: PropTypes.func,
  onCurrentOpenFilterChange: PropTypes.func
};

const FilterSubMenuItem = ({
  filter,
  items,
  currentOpenFilter,
  selectedFilters,
  onCurrentOpenFilterChange,
  onChange
}) => {
  const isOpen = isFilterOpen(filter.key, currentOpenFilter, items);
  return (
    <li className="dropdown-item" key={filter.name}>
      <div
        className={`dropdown-item-content ${isOpen ? "selected" : ""}`}
        onClick={() => {
          onCurrentOpenFilterChange(filter.key);
        }}
      >
        <span>
          <span className="mr-10px">{filter.name}</span>
          <SelectedFilterCountTag
            filterKey={filter.key}
            items={items}
            selectedFilters={selectedFilters}
          />
        </span>
        <span className="float-right">
          <FontAwesomeIcon icon="angle-right" />
        </span>
      </div>
      <ul className={`dropdown-submenu ${isOpen ? "open" : ""}`}>
        {filter.children.map(childFilter => (
          <FilterItemContainer
            key={childFilter.key}
            filter={childFilter}
            items={items}
            currentOpenFilter={currentOpenFilter}
            selectedFilters={selectedFilters}
            onCurrentOpenFilterChange={onCurrentOpenFilterChange}
            onChange={onChange}
          />
        ))}
      </ul>
    </li>
  );
};

FilterSubMenuItem.propTypes = {
  filter: PropTypes.object,
  items: PropTypes.array,
  selectedFilters: PropTypes.object,
  currentOpenFilter: PropTypes.string,
  onChange: PropTypes.func,
  onCurrentOpenFilterChange: PropTypes.func
};

class FilterDropdown extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    items: PropTypes.array,
    selectedFilters: PropTypes.object,
    currentOpenFilter: PropTypes.string,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    onChange: PropTypes.func,
    onCurrentOpenFilterChange: PropTypes.func,
    onCloseAll: PropTypes.func
  };

  static defaultProps = {
    disabled: false,
    loading: false,
    onCloseAll: () => {}
  };

  render() {
    const {
      isOpen,
      currentOpenFilter,
      items,
      selectedFilters,
      onCurrentOpenFilterChange,
      onCloseAll,
      onChange
    } = this.props;
    return (
      <ul className={`dropdown-menu ${isOpen ? "open" : ""}`}>
        <SelectedFilter
          items={items}
          selectedFilters={selectedFilters}
          onCloseAll={onCloseAll}
        />

        {items.map(filter => {
          if (filter.children) {
            return (
              <FilterSubMenuItem
                key={filter.key}
                filter={filter}
                items={items}
                currentOpenFilter={currentOpenFilter}
                selectedFilters={selectedFilters}
                onCurrentOpenFilterChange={onCurrentOpenFilterChange}
                onChange={onChange}
              />
            );
          } else {
            return (
              <li key={filter.key}>
                <ul>
                  <FilterItemContainer
                    filter={filter}
                    items={items}
                    currentOpenFilter={currentOpenFilter}
                    selectedFilters={selectedFilters}
                    onCurrentOpenFilterChange={onCurrentOpenFilterChange}
                    onChange={onChange}
                  />
                </ul>
              </li>
            );
          }
        })}
      </ul>
    );
  }
}

export default FilterDropdown;
