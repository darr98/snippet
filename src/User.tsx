import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from './customhooks/useAuth';
import useRefresh from './useRefreshToken';
function User() {

    const context = useAuth()
    const navigate =useNavigate()
    const location  = useLocation()

    if (!context) {
        throw new Error('AuthContext used outside AuthProvider');
      }
      const { auth, setAuth } = context
      const refresh = useRefresh()
      useEffect(()=>{

        console.log('Entering Users useEeffect')
        const handleRefresh = async () => {
          if (!auth) {
            try {
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
          Welcome to Users
        </div>
       
            <div>
            <header>
            <nav>
                <Link to="/dashboard" className="nav-button">Dashboard</Link>
            </nav>
          </header>
          </div>
          </div>
          )
        
}

export default User
