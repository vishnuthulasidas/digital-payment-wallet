import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import HomePage from '../pages/HomePage';
import WalletPage from '../pages/WalletPage';
import TransferPage from '../pages/TransferPage';
import HistoryPage from '../pages/HistoryPage';
import PeoplePage from '../pages/PeoplePage';
import DashboardPage from '../pages/DashboardPage';
import AuthenticationPage from '../pages/AuthenticationPage';
import ProfilePage from '../pages/ProfilePage';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />

        {/* Authentication Page Route */}
        <Route path='/auth' element={<AuthenticationPage />} />
        <Route path='/dashboard' element={<DashboardPage />} >
          <Route path='' element={<HomePage />} />
          <Route path='home' element={<HomePage />} />
          <Route path='wallet' element={<WalletPage />} />
          <Route path='transfer' element={<TransferPage />} />
          <Route path='history' element={<HistoryPage />} />
          <Route path='people' element={<PeoplePage />} />
          <Route path='profile' element={<ProfilePage />} />

        </Route>

        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
