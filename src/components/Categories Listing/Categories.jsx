import React, { useEffect, useState } from 'react'
import categoryService from '../../services/categoryService';
import { Button, Menu, MenuItem } from '@mui/material';
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiCategory } from "react-icons/bi";
import { Link } from 'react-router-dom';

function Categories() {

  // State Variable
  const [categories, setCategories] = useState([]);

  // Button Modal 
  const [anchorEl, setAnchorEl] = useState(null);
  const open = anchorEl;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        className='flex items-center'
        style={{ textTransform: "capitalize", color: "#111", fontSize: "1.1rem" }}
        onClick={handleClick}
      >
        <BiCategory className='me-2 text-red-400 text-2xl' /> <span>Categories</span> <IoIosArrowDown className='ms-1' />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          categories && categories.slice(0, 8).map(({ name, slug }) => {
            return <Link key={slug} to={`/products/${slug}`}>
              <MenuItem key={slug} onClick={handleClose}>{name}</MenuItem>
            </Link>
          })
        }
      </Menu>
    </>
  )
}

export default Categories
