import './Controls.css';

import { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FilterBar = ({ onFilter, onSearch }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedType, setSelectedType] = useState('All');

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const month = date ? date.getMonth() + 1 : null;
    const year = date ? date.getFullYear() : null;
    const formattedDate = date ? `${year}-${month < 10 ? `0${month}` : month}` : '';
    onFilter(selectedType, formattedDate);
  };

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSelectedType(type);
    const month = selectedDate ? selectedDate.getMonth() + 1 : null;
    const year = selectedDate ? selectedDate.getFullYear() : null;
    const formattedDate = selectedDate ? `${year}-${month < 10 ? `0${month}` : month}` : '';
    onFilter(type, formattedDate);
  };

  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="controls">
      <div className="filter-bar">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          placeholderText="Filter by Date"
          className="date-picker"
          showPopperArrow={false}
          name='date-filter'
        />
        <select
          onChange={handleTypeChange}
          value={selectedType} 
          name='type-filter'
        >
          <option value="All">Filter by Type</option>
          <option value="Signature">Signature</option>
          <option value="Standalone">Standalone</option>
        </select>
      </div>

      <div className="search-bar">
        <input 
          type="text"
          placeholder="Search retreats by title"
          onChange={handleSearch}
          name='search'
        />
      </div>
    </div>
  );
};

FilterBar.propTypes = {
  onFilter: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default FilterBar;
