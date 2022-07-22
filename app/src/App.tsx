import React, { useEffect, useState } from 'react';

function App() {
  const [capitals, setCapitals] = useState<{}[]>([]);

  useEffect(() => {
    const fetchCapitals = async () => {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}api/capitals/`)
        .then(r => r.json())
        .then(data => setCapitals(Object.entries(data)));
    };

    fetchCapitals();
  }, []);

  return (
    <div>
      <select id="capitals" name="capitals">
        <option selected disabled>Select a city</option>
        {capitals && capitals.map((capital) => 
            <option id={capital[0]} value={capital[0]}>
              {`${capital[1].capital} (${capital[1].name})`}
            </option>
        )}
      </select>
    </div>
  );
}

export default App;
