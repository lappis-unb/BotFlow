import React from 'react';
import SiderMenu from './components/SiderMenu';
import SaveData from './components/SaveData';
import Dialog from './components/Dialog';
import AlternativeBallons from './components/AlternativeBallons';

function App() {
  return (
    <div>
      <SiderMenu />
      <SaveData />
      <AlternativeBallons />
      <Dialog key="123" utterValue="teste" />
    </div>
  );
}

export default App;
