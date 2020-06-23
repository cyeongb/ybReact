import React, { useState, useCallback } from "react";

const App2 = () => {
  const [delta, setDelta] = useState(1);
  const [c, setC] = useState(0);

  const incrementDelta = useCallback(() => setDelta(delta => delta + 1), []);
  const increment = useCallback(() => setC(c => c + delta), []);

  return <div></div>;
};

export default App2;
