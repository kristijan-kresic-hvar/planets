import { useState } from 'react';
import Navbar from '@/components/Navbar';
import type { Planet } from '@/types';
import planets from '@/data.json';

const defaultPlanet: Planet = {
  ...planets[0],
  color: 'var(--pacific-blue)',
};

const App = () => {
  const [activePlanet, setActivePlanet] = useState(defaultPlanet);

  return (
    <div className="App">
      <Navbar activePlanet={activePlanet} setActivePlanet={setActivePlanet} />
    </div>
  );
};

export default App;
