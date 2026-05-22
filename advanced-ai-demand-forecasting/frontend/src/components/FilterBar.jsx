const FilterBar = ({ filters, setFilters }) => {
  return (
    <div className="filter-bar">
      <input
        type="date"
        value={filters.startDate}
        onChange={(e) =>
          setFilters({ ...filters, startDate: e.target.value })
        }
      />

      <input
        type="date"
        value={filters.endDate}
        onChange={(e) =>
          setFilters({ ...filters, endDate: e.target.value })
        }
      />

      <select
        value={filters.region}
        onChange={(e) =>
          setFilters({ ...filters, region: e.target.value })
        }
      >
        <option value="">All Regions</option>
        <option value="South">South</option>
        <option value="North">North</option>
        <option value="East">East</option>
        <option value="West">West</option>
      </select>

      <select
        value={filters.category}
        onChange={(e) =>
          setFilters({ ...filters, category: e.target.value })
        }
      >
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Accessories">Accessories</option>
        <option value="Office">Office</option>
        <option value="Wearables">Wearables</option>
        <option value="Networking">Networking</option>
      </select>

      <button
        onClick={() =>
          setFilters({
            startDate: "",
            endDate: "",
            region: "",
            category: "",
          })
        }
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterBar;