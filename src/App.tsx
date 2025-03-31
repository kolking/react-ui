import { useCallback, useState } from 'react';
import SvgLogo from './assets/react.svg?react';

import { Button } from '@lib';
// import '@lib/styles/style.css';

function App() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount((count) => count + 1);
  }, []);

  return (
    <main>
      <SvgLogo className="logo" />
      <h1>Component Library</h1>
      <Button title={`Count is ${count}`} onClick={handleClick} />
    </main>
  );
}

export default App;
