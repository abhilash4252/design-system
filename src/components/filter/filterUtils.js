import memoize from 'memoize-one';

const getTotalSelectedFilterCount = memoize((filterItems, selectedFilters) => {
  const allSelectedFilterKey = new Set(Object.keys(selectedFilters));
  const allFilterKeys = getAllFilterKeys(filterItems);

  let count = 0;

  allFilterKeys.forEach(key => {
    if (allSelectedFilterKey.has(key)) {
      count += getFilterCount(selectedFilters[key].value);
    }
  });

  return count;
});

const getFilterCount = value => {
  if (value === undefined) {
    return 0;
  }

  return Array.isArray(value) ? value.length : 1;
};

const addFilterCount = (filterCount1, filterCount2) => {
  const filterCount = {
    ...filterCount1
  };

  Object.entries(filterCount2).forEach(([filterKey, count]) => {
    if (filterKey in filterCount) {
      filterCount[filterKey] += count;
    } else {
      filterCount[filterKey] = count;
    }
  });

  return filterCount;
};

const _getSelectedFilterCountList = (filterItems, selectedFilters) => {
  if (!filterItems) {
    return {};
  }

  let filterCount = {};

  filterItems.forEach(filter => {
    const selectedFilterValue = selectedFilters[filter.key];
    if (filterCount[filter.key] === undefined) {
      filterCount[filter.key] = 0;
    }

    if (selectedFilterValue && selectedFilterValue.value !== undefined) {
      filterCount[filter.key] = getFilterCount(selectedFilterValue.value);
    }

    if (filter.children) {
      const childFilterCount = _getSelectedFilterCountList(
        filter.children,
        selectedFilters
      );

      if (Object.keys(childFilterCount).length) {
        filterCount = addFilterCount(filterCount, childFilterCount);

        filterCount[filter.key] = 0;

        filter.children.forEach(childFilter => {
          if (childFilter.key in filterCount) {
            filterCount[filter.key] += filterCount[childFilter.key];
          }
        });
      }
    }
  });

  return filterCount;
};

const getSelectedFilterCountList = memoize((filterItems, selectedFilters) => {
  return _getSelectedFilterCountList(filterItems, selectedFilters);
});

const getFilterPathKeys = memoize((filterItems, currentOpenFilterKey) => {
  if (!filterItems) {
    return [];
  }
  let keys = [];

  filterItems.some(filter => {
    if (filter.key === currentOpenFilterKey) {
      keys.push(filter.key);

      return true;
    } else {
      if (filter.children) {
        const childKeys = getFilterPathKeys(
          filter.children,
          currentOpenFilterKey
        );

        if (childKeys.length) {
          keys = [filter.key];
          keys = keys.concat(childKeys);

          return true;
        }
      }
    }
  });

  return keys;
});

const getAllFilterKeys = memoize(filterItems => {
  if (!filterItems) {
    return [];
  }

  let keys = [];

  filterItems.forEach(filter => {
    keys.push(filter.key);

    if (filter.children) {
      const childKeys = getAllFilterKeys(filter.children);

      if (childKeys.length) {
        keys = keys.concat(childKeys);
      }
    }
  });

  return keys;
});

export {
  getTotalSelectedFilterCount,
  getSelectedFilterCountList,
  getFilterPathKeys,
  getAllFilterKeys
};
