import React, { useEffect, useState } from 'react'
import categoryService from '../../services/categoryService';
import { Button, Menu, MenuItem } from '@mui/material';
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiCategory } from "react-icons/bi";
import { Link } from 'react-router-dom';
import "./css/category.css";

function Categories() {

  // State Variable
  const [categories, setCategories] = useState([]);

  // Get Categories
  useEffect(() => {
    (async () => {
      try {
        const categories = await categoryService.getCategories();
        setCategories(categories);
      } catch (error) {

      }
    })()
  }, []);


  return (
    <>
      <button type='button' className='relative main-menu flex items-center rounded-none text-white'>
        <BiCategory className='me-2 text-2xl' style={{ color: '#fff' }} /> <span>Categories</span> <IoIosArrowDown className='ms-1' />
        <div className="main-menu-list">
          {
            categories && categories.map(({ name, id, children }) => (
              <Link to={`/products/${id}`} key={id} className='text-black flex items-center justify-between main-menu-link'>
                <span className='main-menu-link-title'>{name}</span>
                {children.length > 0 && <IoIosArrowForward className='ms-auto main-menu-link-icon' style={{ fontSize: ".8rem" }} />}

                <div className="sub-menus">
                  {
                    children?.map(({ name, id, children }) => (
                      <Link to={`/products/${id}`} key={id} className='text-black flex items-center justify-between'>
                        <span>{name}</span>
                        {children && <IoIosArrowForward className='ms-auto' style={{ fontSize: ".8rem" }} />}
                      </Link>
                    ))
                  }
                </div>

              </Link>
            )
            )}
        </div>
      </button>


    </>
  )
}

export default Categories
