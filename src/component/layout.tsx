import { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppContext, getStateFromLocalStorage } from './mycontext';
import  '../App.css'

function Layout() {
  const context = useContext(AppContext);
  const storedState = getStateFromLocalStorage("appState");
  const { userid,username} = storedState;
  const navigate = useNavigate();
  const logout = () => {
    navigate("/", {});
    context.dispatch({ type: "LOGOUT", value: { userid: "", username: "", isLogon: false } })
  }
  return (
    <div>
      <>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="container-fluid">
        <span className="navbar-text">Hanaro Album</span>
        {userid ? (
              <div className="ml-auto">
                <span className="navbar-text">{userid}&nbsp;&nbsp;{username}</span>&nbsp;&nbsp;
                <button className="btn btn-outline-success" onClick={logout}>Logout</button>
              </div>
            ):""}
      </div>
    </nav>
    <div style={{"marginTop":"20px"}}></div>
      <Outlet/>
      </>
      
    </div>
  );
}

export default Layout;
