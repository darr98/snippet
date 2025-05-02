import { useEffect,useState,ChangeEvent, MouseEvent, useRef} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from './useAuth';
import useRefresh from './useRefreshToken';
import PrevCards from './PrevCards';
import "./Cards.css"
interface CardsList{
    id :number
  }



const DetCards =() =>{
const context = useAuth()

if (!context) {
  throw new Error('AuthContext used outside AuthProvider');
}
const { auth, setAuth ,IsdetCard,setDetCard } = context
const [isClose,  setClose] = useState<boolean>(false)


const navigate = useNavigate()
const location = useLocation(); 
const [imageUrl, setImageUrl] = useState<string>("");
const fileInputRef = useRef<HTMLInputElement>(null);
const [cards ,SetCards] = useState<CardsList[]>([{id:1},{id:2},
  {id:3},{id:4},{id:5}]);


const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
const file = event.target.files?.[0]


if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
    console.log(`pic string :${reader.result}`)
    setImageUrl(reader.result as string); // Set the image URL once uploaded
    };
    reader.readAsDataURL(file); // Read the file as a data URL
}
};

const triggerFileInput = () => {
    fileInputRef.current?.click(); // This triggers the file input dialog
};

const handleSubmit= ()=>{
  setClose((prev)=>!prev)
  setTimeout(()=>{
  setDetCard(prev=>!prev)
  },200)
}
  return (
    <div>
      {IsdetCard && <div className={`container_chat_bot ${isClose ? 'scaleOut' : 'scaleIn'}`}>
        <div className="container-chat-options">
          <div className="chat">
            <div className="chat-bot">
              <textarea
                id="chat_bot"
                name="chat_bot"
                placeholder="Imagine Something...✦˚"
              ></textarea>
                {imageUrl && (
                      <img
                        src={imageUrl}
                        alt="Uploaded preview"
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover',
                          marginTop: '10px',
                          borderRadius: '8px',
                          border: '1px solid #ccc',
                        }}
                      />
                    )}
             </div>
            <div className="options">
              <div className="btns-add">
                <button onClick={triggerFileInput}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox=" 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 8v8a5 5 0 1 0 10 0V6.5a3.5 3.5 0 1 0-7 0V15a2 2 0 0 0 4 0V8"
                    ></path>
                  </svg>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                </button>
            
              </div>


              <button className="btn-submit" onClick={handleSubmit}>
                <i>
                  <svg viewBox="0 0 1920 1920">
                    <path
                      fill="currentColor"
                      d='M1154.976 0 988.342 166.52c-60.448 60.447-63.436 153.418-15.4 220.646L670.359 689.751c-4.022 4.022-6.55 8.964-9.079 13.79-147.212-61.022-328.671-34.246-444.626 81.709l-98.027 98.141 418.31 418.195-520.129 520.129c-22.41 22.409-22.41 58.724 0 81.248 11.262 11.147 25.972 16.778 40.682 16.778s29.42-5.63 40.567-16.778l520.128-520.129 418.195 418.31 98.142-98.142c75.962-75.847 117.793-176.862 117.793-284.313 0-56.195-12.067-110.208-33.787-160.198 2.758-1.839 5.861-2.988 8.275-5.516l303.963-303.964c29.19 21.145 63.896 33.097 100.67 33.097 46.083 0 89.293-17.928 121.93-50.565L1920 764.909 1154.976 0Z'
                      // d="M1154.976 0 988.342 166.52c-60.448 60.447-63.436 153.418-15.4 220.646L670.359 689.751c-4.022 4.022-6.55 8.964-9.079 13.79-147.212-61.022-328.671-34.246-444.626 81.709l-98.027 98.141 418.31 418.195-520.129 520.129c-22.41 22.409-22.41 58.724 0 81.248 11.262 11.147 25.972 16.778 40.682 16.778s29.42-5.63 40.567-16.778l520.128-520.129 418.195 418.31 98.142-98.142c75.962-75.847 117.793-176.862 117.793-284.313 0-56.195-12.067-110.208-33.787-160.198 2.758-1.839 5.861-2.988 8.275-5.516l303.963-303.964c29.19 21.145 63.896 33.097 100.67 33.097 46.083 0 89.293-17.928 121.93-50.565L1920 764.909 1154.976 0Z"
                    ></path>
                  </svg>
                </i>
              </button>

            </div>
          </div>
        </div>
    </div>}
    </div>
  )
}

export default DetCards
