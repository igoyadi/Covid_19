import React, { useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { X, SortAsc, SortDesc, Hash, Text } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const AddOn = ({ min, max, onApply, onClose }) => {
  const { theme } = useTheme();
  const [range, setRange] = useState([min, max]);
  const [sortBy, setSortBy] = useState('alphabet'); // 'alphabet' | 'number'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'

  const handleApply = () => {
    onApply({ range, sortBy, sortOrder });
    onClose();
  };

  return (
    <div className={`shadow-xl rounded-xl p-4 border w-full sm:w-80 mx-auto ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Filter Options</h3>
        <button onClick={onClose}>
          <X className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-black'}`} />
        </button>
      </div>

      <div className="mb-5">
        <label className={`block mb-2 font-semibold text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Select Range:</label>
        <RangeSlider
          min={min}
          max={max}
          defaultValue={[min, max]}
          onInput={setRange}
        />
        <div className={`flex justify-between text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          <span>{range[0]}</span>
          <span>{range[1]}</span>
        </div>
      </div>

      <div className="mb-5">
        <label className={`block mb-2 font-semibold text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Sort By:</label>
        <div className="space-y-2">
          <label className={`flex items-center space-x-2 text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
            <input
              type="radio"
              name="sortBy"
              value="alphabet"
              checked={sortBy === 'alphabet'}
              onChange={() => setSortBy('alphabet')}
            />
            <Text className="w-4 h-4" />
            <span>Alphabet</span>
          </label>

          <label className={`flex items-center space-x-2 text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
            <input
              type="radio"
              name="sortBy"
              value="number"
              checked={sortBy === 'number'}
              onChange={() => setSortBy('number')}
            />
            <Hash className="w-4 h-4" />
            <span>Number</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <label className={`block mb-2 font-semibold text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Sort Order:</label>
        <div className="space-y-2">
          <label className={`flex items-center space-x-2 text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
            <input
              type="radio"
              name="sortOrder"
              value="asc"
              checked={sortOrder === 'asc'}
              onChange={() => setSortOrder('asc')}
            />
            <SortAsc className="w-4 h-4" />
            <span>Ascending</span>
          </label>

          <label className={`flex items-center space-x-2 text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
            <input
              type="radio"
              name="sortOrder"
              value="desc"
              checked={sortOrder === 'desc'}
              onChange={() => setSortOrder('desc')}
            />
            <SortDesc className="w-4 h-4" />
            <span>Descending</span>
          </label>
        </div>
      </div>

      <button
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm"
        onClick={handleApply}
      >
        Apply
      </button>
    </div>
  );
};

export default AddOn;