import React from 'react'
import Categories from '../Categories Listing/Categories'
import { Link } from 'react-router-dom'

function NavigationMenus() {

  const navMenus = [
    {
      title: "About Us",
      slug: "about-us",
      isActive: true
    },
    {
      title: "Delivery Details",
      slug: "delivery-details",
      isActive: true
    },
    {
      title: "Blogs",
      slug: "blogs",
      isActive: true
    }
  ]

  return (
    <>
      <div className="navigation-menus bg-white shadow-sm py-3">
        <div className="container">
          <div className="row flex items-center">
            <div className="col-xl-2 col-4 categories">
              <Categories />
            </div>
            <div className="col-8 nav-menus-list">
              {
                navMenus && navMenus?.map(({ title, slug, isActive }) => {
                  return (isActive ?
                    <Link to={`/${slug}`} key={slug} className='mx-3 font-medium hover:text-red-500'>{title}</Link>
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
