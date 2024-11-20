import React from 'react'
import { Layout, UserProfile } from '../components/index'

function ProfilePage() {
    return (
        <section style={{ backgroundColor: "#f7f7fa" }}>
            <Layout>
                <div className="container py-28" style={{ height: "100%", paddingTop: "4rem" }}>
                    <UserProfile />
                </div>
            </Layout>
        </section>
    )
}

export default ProfilePage
