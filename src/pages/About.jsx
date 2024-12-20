import React from 'react';
import { Layout, Logo } from '../components/index';

const About = () => {
    return (
        <Layout>
            <div className="intro pt-24 px-16">
                <h5 className='text-3xl font-bold'>Welcome To</h5>
                <Logo width={"200px"} height={"200px"} />
                <p className='text-md font-semibold'>Eways is a customer oriented e-commerce platform that aims to take care of shopping needs in a SMART way; making life easier for all customers. We are Pakistan’s premier online grocery store with services initially in Karachi. Our aim is to enhance the online community by becoming the nations favorite e commerce platform through our very own SMART fundamentals.</p>
            </div>
            <div className="vision pt-16 px-16">
                <h6 className='text-lg font-bold mb-3'>Vision:</h6>
                <p>Our aim is to expand the online community by becoming the nations favorite e commerce platform through our very own SMART fundamentals.</p>
            </div>
            <div className="vision pt-5 pb-16 px-16">
                <h6 className='text-lg font-bold mb-3'>Mission:</h6>
                <p>Eways is a customer oriented e-commerce platform that aims to take care of shopping needs in a SMART way; making life easier for all customers.</p>
            </div>
            <div className="vision pb-16 px-16">
                <h6 className='text-lg font-bold mb-3'>Values:</h6>
                <p className='text-sm mb-2'>Our SMART values at Eways are;</p>
                <ul className='list-disc ms-4'>
                    <li>Synergy through innovation</li>
                    <li>Matchless Customer Service</li>
                    <li>Accountable to the core</li>
                    <li>Revitalizing shopping through technology</li>
                    <li>Teamwork with enthusiasm and family spirit</li>
                </ul>
            </div>
        </Layout>
    )
}

export default About
