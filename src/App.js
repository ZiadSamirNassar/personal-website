import React from 'react';
import Nav from './components/TopNav';
import DynamicHeader from './components/Header';
import DynamicExperience from './components/Experience';
import DynamicEducation from './components/Education';
import DynamicSkills from './components/Skills';

import './style/App.css';

function App() {
  return (
    <>
        <Nav />
        
        <div className="cv-container">

          
          <DynamicHeader />
          <br/>
          <DynamicExperience />
          <br/>
          <DynamicEducation />
          <br/>
          <DynamicSkills />


        </div>
    </>

  );
}

export default App;