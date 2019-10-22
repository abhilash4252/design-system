import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button, OutsideClickWrapper } from "../";

import "./Filter.scss";
import FilterDropdown from "./dropdown/FilterDropdown";
import SelectedView from "./selected-view/FilterSelectedView";
import { filterItemComponents, FILTER_ROOT } from "./filterConstants";
import { getAllFilterKeys, getTotalSelectedFilterCount } from "./filterUtils";

/**
 * Specify `items` as an array of required filters to add the filters to the dropdown.
 *
 */
export class Filter extends Component {
  static Checkbox = filterItemComponents.checkbox;
  static CheckboxGroup = filterItemComponents.checkboxGroup;
  static RadioGroup = filterItemComponents.radioGroup;
  static SearchSelect = filterItemComponents.searchSelect;
  static SelectedView = SelectedView;

  static propTypes = {
    /**
     * List of Filter items to render in the dropdown.
     */
    items: PropTypes.array,
    /**
     * An Object `{filterKey: { name. value}}` that represents the selected filters.
     */
    selectedFilters: PropTypes.object,
    /**
     * A string that represents the current open filter.
     */
    currentOpenFilter: PropTypes.string,
    /**
     * To capture disabled status of the filter.
     */
    disabled: PropTypes.bool,
    /**
     * To capture loading status of the filter.
     */
    loading: PropTypes.bool,
    /**
     * Callback func which gets executed when `currentOprnFilter` changes.
     */
    onCurrentOpenFilterChange: PropTypes.func,
    /**
     * Callback func which gets executed when filters are clicked.
     */
    onChange: PropTypes.func,
    /**
     * Callback func which gets executed when `clear` link is clicked.
     */
    onCloseAll: PropTypes.func
  };

  static defaultProps = {
    disabled: false,
    loading: false,
    onCloseAll: () => {}
  };

  constructor(props) {
    super(props);

    const { items } = props;

    const allFilterKeys = getAllFilterKeys(items);
    const uniqueFilterKeys = new Set();
    const differenceKeys = [];

    allFilterKeys.forEach(key => {
      if (uniqueFilterKeys.has(key)) {
        differenceKeys.push(key);
      } else {
        uniqueFilterKeys.add(key);
      }
    });

    if (differenceKeys.length) {
      console.error(
        `Filter Component: All filter keys should be unique. Repeated keys: [${differenceKeys}]`
      );
    }
  }

  isFilterDropDownOpen = () => {
    const { currentOpenFilter, items } = this.props;

    const allFilterKeys = new Set(getAllFilterKeys(items));

    return (
      FILTER_ROOT === currentOpenFilter || allFilterKeys.has(currentOpenFilter)
    );
  };

  toogleIsOpen = () => {
    const { onCurrentOpenFilterChange, currentOpenFilter } = this.props;
    onCurrentOpenFilterChange(currentOpenFilter ? "" : FILTER_ROOT);
  };

  handleOnChange = (filterKey, value) => {
    const { selectedFilters, onChange } = this.props;

    const updatedSelectedFilters = {
      ...selectedFilters
    };

    if (value === undefined || value === "") {
      delete updatedSelectedFilters[filterKey];
    } else {
      updatedSelectedFilters[filterKey] = value;
    }

    onChange({
      filterKey,
      value,
      selectedFilters: updatedSelectedFilters
    });
  };

  handleOnCloseAll = () => {
    const { onChange, onCloseAll, items, selectedFilters } = this.props;

    const allSelectedFilterKey = Object.keys(selectedFilters);
    const allFilterKeys = new Set(getAllFilterKeys(items));

    const differenceKeys = allSelectedFilterKey.filter(
      key => !allFilterKeys.has(key)
    );

    const filters = {};

    differenceKeys.forEach(filterKey => {
      filters[filterKey] = selectedFilters[filterKey];
    });

    onChange({ selectedFilters: filters });

    onCloseAll();
  };

  render() {
    const isOpen = this.isFilterDropDownOpen();
    const {
      items,
      currentOpenFilter,
      selectedFilters,
      onCurrentOpenFilterChange
    } = this.props;
    const selectedFilterCount = getTotalSelectedFilterCount(
      items,
      selectedFilters
    );
    return (
      <div id="platform-filter-component">
        <OutsideClickWrapper
          onOutsideClick={this.toogleIsOpen}
          disabled={!isOpen}
          display="inline-block"
        >
          <div className="dropdown">
            {isOpen ? (
              <FilterDropdown
                isOpen={isOpen}
                items={items}
                currentOpenFilter={currentOpenFilter}
                onCurrentOpenFilterChange={onCurrentOpenFilterChange}
                selectedFilters={selectedFilters}
                onChange={this.handleOnChange}
                onCloseAll={this.handleOnCloseAll}
              />
            ) : null}

            <Button size="large" onClick={this.toogleIsOpen}>
              <span>Filters</span>
              {selectedFilterCount ? (
                <span className="ml-5px">({selectedFilterCount})</span>
              ) : null}
              <FontAwesomeIcon
                className="carret-down"
                icon="angle-down"
                style={{ fontSize: "12px" }}
              />
            </Button>
          </div>
        </OutsideClickWrapper>
      </div>
    );
  }
}

export default Filter;
