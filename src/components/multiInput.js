import React, { useState, useContext } from "react";

import { Context } from "./store";
import RubbishIcon from "./icons/rubbish";
import styles from "./forms.module.scss";

const MultiInput = ({ dispatchType, initialValues, placeholderMessage }) => {
  const [{}, dispatch] = useContext(Context);

  const [values, setValues] = useState(
    Array.isArray(initialValues) ? initialValues : [initialValues]
  );

  //change handler
  const changeInputValue = (e, index) => {
    console.log(index);
    let newValues = values.map((value, valueIndex) => {
      if (valueIndex === index) {
        return e.target.value;
      } else {
        return value;
      }
    });
    setValues(newValues);
    dispatch({ type: dispatchType, value: newValues });
  };

  //add new input
  const addInput = () => {
    let newValues = values.concat([""]);
    setValues(newValues);
  };

  //remove value
  const removeInput = (index) => {
    let newValues = values.slice(0, index).concat(values.slice(index + 1));
    setValues(newValues);
    dispatch({ type: dispatchType, value: newValues });
  };

  //render els
  const inputEls = values.map((value, index) => {
    let removeButton =
      value.length > 1 ? (
        <button
          type="button"
          className={styles.iconButton}
          onClick={() => removeInput(index)}
        >
          <RubbishIcon color={`#fff`} />
        </button>
      ) : null;
    return (
      <div>
        <input
          placeholder={placeholderMessage}
          type="text"
          value={value}
          onChange={(e) => {
            changeInputValue(e, index);
          }}
        />
        {removeButton}
      </div>
    );
  });

  //add button
  const hideAddButton = () => {
    let hidden = false;
    values.forEach((value) => {
      if (value.length < 1) {
        hidden = true;
      }
    });
    return hidden;
  };
  const addButton = hideAddButton() ? null : (
    <button type="button" className={styles.textButton} onClick={addInput}>
      Add another
    </button>
  );

  return (
    <div className={styles.multiInput}>
      {inputEls}
      {addButton}
    </div>
  );
};

export default MultiInput;
