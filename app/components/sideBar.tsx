import React, { useState } from 'react';
import TaxonomySidebar from "~/components/taxonomy-sidebar";

function Sidebar() {
    const [filters, setFilters] = useState({
        category: [],
        dateRange: { start: null, end: null },
        // ... other filters
    });

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setFilters({
            ...filters,
            category: filters.category.includes(category)
                ? filters.category.filter((c) => c !== category)
                : [...filters.category, category],
        });
    };

    const handleDateRangeChange = (event) => {
        const { id, value } = event.target;
        setFilters({
            ...filters,
            dateRange: {
                ...filters.dateRange,
                [id.replace('date-range-', '')]: value,
            },
        });
    };

    const applyFilters = () => {
        // Apply filters to content (fetch data or filter existing data)
        console.log('Filters applied:', filters);
    };

    return (
        <div className="sidebar">
            <h2>Filters</h2>

            <div className="filter-group">
                <h3>Category</h3>
                <ul>
                    <li>
                        <input
                            type="checkbox"
                            value="Technology"
                            checked={filters.category.includes('Technology')}
                            onChange={handleCategoryChange}
                        />{' '}
                        Technology
                    </li>
                    {/* Add more categories here */}
                </ul>
            </div>

            <div className="filter-group">
                <h3>Additional Filters</h3>
                <ul>
                    <li>
                        <label htmlFor="date-range-start">Date Range:</label>
                        <input
                            type="date"
                            id="date-range-start"
                            value={filters.dateRange.start || ''}
                            onChange={handleDateRangeChange}
                        />{' '}
                        to{' '}
                        <input
                            type="date"
                            id="date-range-end"
                            value={filters.dateRange.end || ''}
                            onChange={handleDateRangeChange}
                        />
                    </li>
                    {/* Add more filters here */}
                </ul>
            </div>

            <button onClick={applyFilters}>Apply Filters</button>
            <TaxonomySidebar />
        </div>
    );
}

export default Sidebar;