import React, { useState, useEffect } from 'react';
import './App.css';
import Popup from './Popup';
import Dropdown from './Dropdown';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [dropdownData, setDropdownData] = useState([]);
  const [selectedValues, setSelectedValues] = useState({
    title: '',
    price: '',
    discountPercentage: '',
    category: '',
  });
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('selectedItems'));
    if (savedItems) {
      setSelectedItems(savedItems);
    }

    async function fetchData() {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        console.log(data);
        setDropdownData(data.products);
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    }
    fetchData();
  }, []);

  const handleDropdownChange = (e) => {
    setSelectedValues({
      ...selectedValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (
      selectedValues.title &&
      selectedValues.price &&
      selectedValues.discountPercentage &&
      selectedValues.category
    ) {
      const newSelectedItems = [...selectedItems, selectedValues];
      setSelectedItems(newSelectedItems);
      setShowPopup(false);

      localStorage.setItem('selectedItems', JSON.stringify(newSelectedItems));
    } else {
      alert("Please select all options before saving.");
    }
  };

  return (
    <div className="App">
      <h1>Api Fetching</h1>
      <button onClick={() => setShowPopup(true)}>Add</button>
      <Popup showPopup={showPopup} setShowPopup={setShowPopup}>
        <Dropdown
          name="title"
          options={dropdownData.map((product) => ({ id: product.id, value: product.title, label: product.title }))}
          onChange={handleDropdownChange}
        />
        <Dropdown
          name="price"
          options={dropdownData.map((product) => ({ id: product.id, value: product.price, label: product.price }))}
          onChange={handleDropdownChange}
        />
        <Dropdown
          name="discountPercentage"
          options={dropdownData.map((product) => ({ id: product.id, value: product.discountPercentage, label: product.discountPercentage }))}
          onChange={handleDropdownChange}
        />
        <Dropdown
          name="category"
          options={dropdownData.map((product) => ({ id: product.id, value: product.category, label: product.category }))}
          onChange={handleDropdownChange}
        />
        <button onClick={handleSave}>Save</button>
      </Popup>

      {selectedItems.length > 0 && (
        <div>
          <h2>Selected Items</h2>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Discount Percentage</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.discountPercentage}</td>
                  <td>{item.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
