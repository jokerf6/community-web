import React from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import users from "./group 1.png";
import setting from "./settings (1) 1.png";
import note from "./documents 1.png";


const Sidebar = () => {
    return (
        <div className='allnav'>
            <CDBSidebar textColor="#7d7d7d" backgroundColor="white">
                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink exact to="/" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon='users'>
                                Participants
                            </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/settings" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon='book'>
                                Media
                            </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon='cog'>
                                Community Settings
                            </CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarMenu>
                </CDBSidebarContent>
            </CDBSidebar>
        </div>
    );
};

export default Sidebar;

