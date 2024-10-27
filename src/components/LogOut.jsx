import { useDispatch } from "react-redux";
import { logInUser, logOutUser } from "../store/darazSlice";
import authService from "../appwrite/authService";

function LogOut() {
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      authService.logOutUser()
      .then((res)=>{
        if(res){
            dispatch(logOutUser());
        }
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={logout}> Log Out</button>
    </>
  );
}

export default LogOut;
