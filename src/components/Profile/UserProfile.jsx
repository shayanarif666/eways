import React, { useState } from 'react'
import { ProfileSidebar, ProfileTabs } from '../index'
import "./css/profile.css"

function UserProfile() {

    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <>
            <div className="row g-4">
                {/* Sidebar */}
                <div className="col-xl-3 col-md-4">
                    <ProfileSidebar onTabChange={setSelectedTab} />
                </div>

                {/* Content Area */}
                <div className="col-xl-9 col-md-8">
                    <ProfileTabs selectedTab={selectedTab} />
                </div>
            </div>
        </>
    )
}

export default UserProfile
