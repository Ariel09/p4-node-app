import { Outlet } from "react-router";
import Navbar from "../pages/NavBar";

function DefaulLayout() {

    return (
      <div>
        <Navbar/>
        <div className="outlet-container">
          <Outlet/>
        </div>
      </div>
    );
}

export default DefaulLayout;