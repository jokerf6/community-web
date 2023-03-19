
import React, { useState } from "react";
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import './Navbar.css';
import classNames from "classnames";
import Participants from "../Participants/Participants";
import Media from "../Media/Media";
import Community from "../Community/Community";



const Sidebar = ({cls}) => {
    const [isActive1, setIsActive1] = useState(true);
    const [isActive2, setIsActive2] = useState(false);
    const [isActive3, setIsActive3] = useState(false);
    const handleClick1 = event => {
        setIsActive1(true);
        setIsActive2(false);
        setIsActive3(false);
    }
    const handleClick2 = event => {
        setIsActive1(false);
        setIsActive2(true);
        setIsActive3(false);
    }
    const handleClick3 = event => {
        setIsActive1(false);
        setIsActive2(false);
        setIsActive3(true);
    }
    return (
        <div className="content">
            <div className='allnav'>
                <CDBSidebar textColor="#7d7d7d" backgroundColor="white">
                    <CDBSidebarContent className="sidebar-content">
                        <CDBSidebarMenu>
                            <CDBSidebarMenuItem icon='users' className={isActive1? 'colored'  : ''} onClick = {handleClick1}>
                                Participants
                            </CDBSidebarMenuItem>
                            <CDBSidebarMenuItem icon='book' className={isActive2?  'colored'  : ''} onClick = {handleClick2}>
                                Media
                            </CDBSidebarMenuItem>
                            <CDBSidebarMenuItem icon='cog' className={isActive3?  'colored' : ''} onClick = {handleClick3}>
                                Community Settings
                            </CDBSidebarMenuItem>
                        </CDBSidebarMenu>
                    </CDBSidebarContent>
                </CDBSidebar>
            </div>
            {isActive1 && (
                <Participants />
            )}
            {isActive2 && (
                <Media />
            )}
            {isActive3 && (
                <Community />
            )}
        </div>
    );
};

export default Sidebar;

