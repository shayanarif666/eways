import React from 'react'
import Categories from '../Categories Listing/Categories'
import { Link } from 'react-router-dom'
import { Divider } from '@mui/material'

function NavigationMenus() {

  const navMenus = [
    {
      title: "About Us",
      slug: "about-us",
      isActive: true
    },
    {
      title: "Privacy Policy",
      slug: "privacy-policy",
      isActive: true
    }
  ]

  return (
    <>
      <div className="navigation-menus bg-white shadow-sm">
        <div className="container">
          <div className="flex items-center">
            <div className="categories px-2 me-4" style={{ backgroundColor: "#111" }}>
              <Categories />
            </div>
            <div className="nav-menus-list">
              {
                navMenus && navMenus?.map(({ title, slug, isActive }) => {
                  return (isActive ?
                    <Link to={`/${slug}`} key={slug} className='mx-3 font-sm text-md hover:text-red-500'>{title}</Link>
                    :
                    ""
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NavigationMenus
