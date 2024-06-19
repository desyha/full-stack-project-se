import "./layout.scss"
import { Navigate, Outlet } from "react-router-dom"
import Header from "../../components/Header.jsx"
import Footer from "../../components/Footer.jsx"
import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/AuthContext.jsx"

function Layout(){
    return(
        <div className="layout">
        <div className="header">
            <Header/>
        </div>
        <div className="content">
            <Outlet/>
        </div>
        
        <div className="foot">
            <Footer/>
        </div>
        </div>
    )
}

function RequireAuth(){

    const {currentUser} = useContext(AuthContext)
    
    return !currentUser ? (
        <Navigate to="/login"/>
    ) : (<div className="layout">
    <div className="header">
        <Header/>
    </div>
    <div className="content">
        <Outlet/>
    </div>
    
    <div className="foot">
        <Footer/>
    </div>
    </div>
    )
}

export {Layout, RequireAuth}