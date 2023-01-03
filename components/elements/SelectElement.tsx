import React, { useEffect, useState } from 'react';

const SelectElement = (props: any) => {

  const [selected, setSelected] = useState(props.value as string | '');

  useEffect(() => {
    setSelected(props.value);
  }, [props.value]);


  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
    if (props.onChange) props.onChange(event);
  };

  return (
    <select  {...props} value={selected} onChange={handleChange}>
      {props.children}
    </select>
  );
};

export default SelectElement;
