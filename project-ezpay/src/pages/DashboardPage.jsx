import { Outlet } from 'react-router-dom'
import   from '../hooks/ '
import Header from '../components/Header'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardPage = () => {
    //check if token exist else redirect to login
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/auth';
    }
     ('EzPay | Dashboard')
  return (
    <div>
      <Header />
      <Outlet />
      <ToastContainer position="bottom-center" theme="dark"/>
    </div>
  )
}

export default DashboardPage
