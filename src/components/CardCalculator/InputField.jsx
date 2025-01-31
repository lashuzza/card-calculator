import React, { useState, useEffect } from 'react'

const InputField = ({ label, value, onChange, name }) => {
  const [inputValue, setInputValue] = useState(value?.toString() || '0')

  useEffect(() => {
    console.log(`${name} value prop changed to:`, value);
    setInputValue(value?.toString() || '0')
  }, [value, name])

  const handleChange = (e) => {
    const newValue = e.target.value
    console.log(`${name} input changed to:`, newValue);
    
    // Update local state immediately
    setInputValue(newValue)
    
    // Convert to number and update parent if valid
    const numberValue = Number(newValue)
    if (!isNaN(numberValue)) {
      console.log(`${name} sending to parent:`, numberValue);
      onChange(name, numberValue)
    }
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={inputValue}
        onChange={handleChange}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        inputMode="decimal"
      />
    </div>
  )
}

export default InputField