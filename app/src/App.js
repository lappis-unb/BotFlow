import React from 'react';
import Dialog from './components/Dialog';
import SiderMenu from './components/SiderMenu';

function App() {
  return (
    <div>
      <SiderMenu />
      <Dialog key="123" utterValue="teste" />
    </div>
  );
}

export default App;
