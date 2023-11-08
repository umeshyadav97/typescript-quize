import React, { useState } from "react";

const Text = () => {
  const [number, setNumber] = useState(0);
  const [value, setValue] = useState(1);
  console.log(number);
  return (
    <>
      <div style={{ color: "red" }} onClick={() => setNumber(number + 1)}>
        Button
      </div>
      <div>{number}</div>
    </>
  );
};

export default Text;
