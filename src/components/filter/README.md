## Filter

A Filter displays a multilevel dropdown with filters.

### How to use

Specify the filter `items` as an array of data.

```javascript

const filterItems = [
    {
        key: 'filter_1',
        name: 'Search Select',
        component: Filter.SearchSelect,
        placeholder: 'Search Select',
        options: ['Item 1', 'Item 2', 'Item 3']
    },
    {
        key: 'filter_2',
        name: 'Checkbox',
        component: Filter.Checkbox
    },
    {
        key: 'filter_3',
        name: 'Checkbox Group',
        component: Filter.CheckboxGroup,
        options: ['Option 1', 'Option 2', 'Option 3']
    },
    {
        key: 'submenu',
        name: 'Submenu',
        children: [
            {
                key: 'filter_4',
                name: 'Radio Group',
                component: Filter.RadioGroup,
                options: ['Option 1', 'Option 2', 'Option 3']
            },
            {
                key: 'filter_5',
                name: 'CheckBox',
                component: Filter.Checkbox
            }
        ]
    }
];

state = {
    selectedFilters: {},
    currentOpenFilter: ''
}


<Filter
  items={filterItems}
  selectedFilters={selectedFilters}
  currentOpenFilter={currentOpenFilter}
  onCurrentOpenFilterChange={filterKey =>
    this.setState({ currentOpenFilter: filterKey })
  }
  onChange={({ filterKey, value, selectedFilters }) => {
    this.setState({
      selectedFilters: {
        ...selectedFilters
      }
    });
  }}
/>

<Filter.SelectedView
  selectedFilters={selectedFilters}
  onCurrentOpenFilterChange={filterKey =>
    this.setState({ currentOpenFilter: filterKey })
  }
  onChange={({ filterKey, value, selectedFilters }) => {
    this.setState({
      selectedFilters: {
        ...selectedFilters
      }
    });
  }}
/>

```

### Example state

When filter menu is open and filters are selected, the state will be like below.

```javascript
state = {
  selectedFilters: {
    filter_1: {
      name: 'Search Select',
      value: ['Item 1', 'Item 2']
    },
    filter_2: {
      name: 'Checkbox',
      value: true
    },
    filter_3: {
      name: 'Checkbox Group',
      value: ['Option 2', 'Option 3']
    },
    filter_4: {
      name: 'Radio Group',
      value: ['Option 1', 'Option 2']
    }
  },
  currentOpenFilter: 'filter_1'
};
```

## API

### Filter

| Property                  |                                 Description                                  |                                          Type | Default |
| ------------------------- | :--------------------------------------------------------------------------: | --------------------------------------------: | ------: |
| items                     |                      a list of Filter items to render.                       |                                            [] |       - |
| selectedFilters           | An object `{filterKey: {name, value}}` that represents the selected filters. |                                        object |       - |
| currentOpenFilter         |               A string that represent the current open filter.               |                                        string |       - |
| disabled                  |                          Disabled status of filter.                          |                                       boolean |   false |
| loading                   |                          Loading status of filter.                           |                                       boolean |   false |
| onCurrentOpenFilterChange |              Callback executed when currentOpenFilter changes.               |                           Function(filterKey) |       - |
| OnChange                  |                 Callback executed when filters are clicked.                  | Function({filterKey, value, selectedFilters}) |       - |

### Filter.SelectedView

| Property                  |                                 Description                                  |                                          Type | Default |
| ------------------------- | :--------------------------------------------------------------------------: | --------------------------------------------: | ------: |
| selectedFilters           | An object `{filterKey: {name, value}}` that represents the selected filters. |                                        object |       - |
| onCurrentOpenFilterChange |              Callback executed when currentOpenFilter changes.               |                           Function(filterKey) |       - |
| OnChange                  |                 Callback executed when filters are clicked.                  | Function({filterKey, value, selectedFilters}) |       - |

### Filter Item Object

| Property    |                        Description                         |     Type | Default |
| ----------- | :--------------------------------------------------------: | -------: | ------: |
| key         |                 Unique key of this filter.                 |   string |       - |
| name        |            Name of the filter shown in the UI.             |   string |       - |
| component   |                The component to be rendered                |   string |       - |
| placeholder |         Plcaholder for filters having Input fields         |   string |      '' |
| options     |         List of options to be shown for a filter.          | string[] |      '' |
| children    | List of filter items objects to be rendered as a sub menu. |       [] |      '' |

### Available Filter components

| Name                 |                           Description                            |
| -------------------- | :--------------------------------------------------------------: |
| Filter.Checkbox      |                 Single filter, applied on click.                 |
| Filter.CheckboxGroup |              Submenu filter with list of checkboxes              |
| Filter.RadioGroup    |            Submenu filter with list of Radio buttons             |
| Filter.SearchSelect  | Submenu filter with a Select Input supporting multiple selection |
