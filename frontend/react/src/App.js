import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import MembersManagement from './pages/members'
import ScheduleCalendar from './pages/scheduleCalendar'
import ScheduleManager from './pages/scheduleManager'

class App extends Component {
  render() {
    return (
      <p className='content' >
        <Routes>
          <Route path="/" element={<ScheduleCalendar />} />
          <Route path="/members" element={<MembersManagement />} />
          <Route path="/dashboard" element={<ScheduleCalendar />} />
          <Route path='/manager' element={<ScheduleManager />} />
        </Routes>
      </p>
    );
  }
}

export default App;
