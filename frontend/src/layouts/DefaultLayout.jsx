import { Outlet } from "react-router";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import NavBar from "../pages/Navbar";

function DefaulLayout() {
  const {token} = useStateContext();
  if(!token){
    return <Navigate to='/login'/>
  }

  return (
    <div>
      <NavBar/>
      <div className="outlet-container">
        <Outlet/>
      </div>
    </div>
  );
}

export default DefaulLayout;