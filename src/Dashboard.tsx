import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from './useAuth';
import useRefresh from './useRefreshToken';

const Dashboard = () =>{
  console.log('Entering dashboard')
  const context = useAuth()
  const navigate = useNavigate()
  const location = useLocation(); 
if (!context) {
    throw new Error('AuthContext used outside AuthProvider');
  }
  const { auth, setAuth } = context
  const refresh = useRefresh()
  useEffect(()=>{

    console.log('Entering Users useEeffect')

    const handleRefresh = async () => {
      console.log('Entering handleFunction')
      if (!auth) {

        console.log('AUTH EMPTPY')
        try {
          console.log('triggering refresh')
          const token = await refresh();
          // Do whatever with the token or let refresh handle auth update
        } catch (err) {
          console.error("Failed to access token from refresh", err);
          navigate('/login', {
            state: { from: location },
            replace: true,
          });
        }
      }
    };

    handleRefresh(); // ✅ Call the async function
    
  },[auth])
  
  return (
    <div>
    <div>
      Welcome to dasboard
    </div>
   
        <div>
        <header>
        <nav>
            <Link to="/user" className="nav-button">Users</Link>
        </nav>
      </header>
      </div>
      </div>
      )
    
}

export default Dashboard
