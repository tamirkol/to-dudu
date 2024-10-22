import React, { useState } from 'react';

export function CheckList() {
    const [checkedItems, setCheckedItems] = useState({
        1: false,
        2: false,
        3: false,
    });

    const handleChange = (event) => {
        const { value, checked } = event.target;
        setCheckedItems((prev) => ({
            ...prev,
            [value]: checked,
        }));
    };

    return (
        
    <div id="checklist">
      <input
        id="01"
        type="checkbox"
        name="r"
        value="1"
        checked={checkedItems[1]}
        onChange={handleChange}
      />
      <label htmlFor="01">Task 1</label>
      <input
        id="02"
        type="checkbox"
        name="r"
        value="2"
        checked={checkedItems[2]}
        onChange={handleChange}
      />
      <label htmlFor="02">Task 2</label>
      <input
        id="03"
        type="checkbox"
        name="r"
        value="3"
        checked={checkedItems[3]}
        onChange={handleChange}
      />
      <label htmlFor="03">Task 3 </label>
    </div>
    );
}