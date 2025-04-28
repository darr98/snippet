import { useEffect,useState,ChangeEvent, MouseEvent, useRef} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from './useAuth';
import useRefresh from './useRefreshToken';
import PrevCards from './PrevCards';
import "./Cards.css"
import DetCards from './DetCards';

interface CardsList{
  id :number
}
const Dashboard = () =>{
  console.log('Entering dashboard')
  const context = useAuth()
  const navigate = useNavigate()
  const location = useLocation(); 
  const [imageUrl, setImageUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cards ,SetCards] = useState<CardsList[]>([{id:1},
    {id:3},{id:4},{id:5}]);

if (!context) {
    throw new Error('AuthContext used outside AuthProvider');
  }
  const { auth, setAuth ,IsdetCard,setDetCard } = context
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
        } 
          /*for it to get to catch..u must throw new error in  refresh or smthnm*/
        catch (err) {
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

  const detailHandle =()=>{
    console.log(`------->>>>>> the isdetCard status is ${IsdetCard}`)
    setDetCard(prev=>!prev)
  }
  // Update text with image preview (if image is selected)
  return (
    <div >
    <div>

    </div>
   
        <div>
        <header>
        <nav>
            <Link to="/user" className="nav-button">Users</Link>
        </nav>
      </header>


      </div>
      <div className='card-container'>
      {cards.map((data , index)=>{
        return(

         <PrevCards id= {data.id}/>
           
        )
        }
      )}
        <div className="det-wrapper">
      { IsdetCard && <DetCards/>}
        </div>
          
           <div className="btns-plus">
                        <button onClick={detailHandle} >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="1 13 50 20"
                                width="20"
                                height="20"
                              >
                                <path
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z M37,26H26v11h-2V26H13v-2h11V13h2v11h11V26z"
                                ></path>
                              </svg>
                            </button>


                  </div>
        </div>

           



            {/*This is after click code*/}  
      
    {/*End of detial card*/}

   
      </div>
      )
    
}

export default Dashboard
