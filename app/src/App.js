import React from 'react';
import Dialog from './components/Dialog';
import SiderMenu from './components/SiderMenu';
import AddDialog from './components/AddDialog';

function App() {
  return (
    <div>
      <SiderMenu />
      <Dialog />
      <Dialog />
      <AddDialog />
    </div>
  );
}

export default App;
