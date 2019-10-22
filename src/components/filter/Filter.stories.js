import React from "react";
import Filter from "./Filter";
import { action } from "@storybook/addon-actions";
import { withKnobs, object, text } from "@storybook/addon-knobs";

export default {
  title: "Molecule/Filter",
  component: Filter,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle:
      "A Filter component displays a multilevel dropdown with filters"
  }
};

// Filter options
const filterItems = [
  {
    key: "filter_1",
    name: "Search Select",
    component: Filter.SearchSelect,
    placeholder: "Search Select",
    options: ["Item 1", "Item 2", "Item 3"]
  },
  {
    key: "filter_2",
    name: "Checkbox",
    component: Filter.Checkbox
  },
  {
    key: "filter_3",
    name: "Checkbox Group",
    component: Filter.CheckboxGroup,
    options: ["Option 1", "Option 2", "Option 3"]
  },
  {
    key: "submenu",
    name: "Submenu",
    children: [
      {
        key: "filter_4",
        name: "Radio Group",
        component: Filter.RadioGroup,
        options: ["Option 1", "Option 2", "Option 3"]
      },
      {
        key: "filter_5",
        name: "CheckBox",
        component: Filter.Checkbox
      }
    ]
  }
];

const actions = {
  onchange: action("Filter Onchnge triggered"),
  onCurrentOpenFilterChange: action("Change current open filter")
};

export const allFilters = () => (
  <React.Fragment>
    {defaultFilter()}
    {zeroFiltersSelected()}
    {openedFilter()}
  </React.Fragment>
);

export const defaultFilter = () => (
  <React.Fragment>
    <Filter
      items={object("all_filters", filterItems)}
      selectedFilters={object("selected_filters", {
        filter_1: {
          name: "Search Select",
          value: ["Item 1", "Item 2"]
        },
        filter_2: {
          name: "Checkbox",
          value: true
        },
        filter_3: {
          name: "Checkbox Group",
          value: ["Option 2", "Option 3"]
        }
      })}
      currentOpenFilter={text("current_open_filter", "")}
      {...actions}
    />

    {/* <Filter.SelectedView
      selectedFilters={object("selected_filters", {
        filter_1: {
          name: "Search Select",
          value: ["Item 1", "Item 2"]
        },
        filter_2: {
          name: "Checkbox",
          value: true
        },
        filter_3: {
          name: "Checkbox Group",
          value: ["Option 2", "Option 3"]
        }
      })}
      {...actions}
    /> */}
  </React.Fragment>
);

export const zeroFiltersSelected = () => (
  <Filter
    items={filterItems}
    selectedFilters={{}}
    currentOpenFilter={""}
    {...actions}
  />
);

export const openedFilter = () => (
  <Filter
    items={filterItems}
    selectedFilters={{
      filter_1: {
        name: "Search Select",
        value: ["Item 1", "Item 2"]
      },
      filter_2: {
        name: "Checkbox",
        value: true
      },
      filter_3: {
        name: "Checkbox Group",
        value: ["Option 2", "Option 3"]
      }
    }}
    currentOpenFilter={"filter_2"}
    {...actions}
  />
);
