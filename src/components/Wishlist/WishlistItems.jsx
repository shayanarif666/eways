import React from 'react';
import { Container, TableContainer, TableHead, TableRow, TableCell, Table, TableBody, IconButton, Rating } from '@mui/material';
import { MdDelete } from "react-icons/md";

function WishlistItems({ items }) {
  return (
    <>
      <div className="table-responsive">
        <TableContainer className="w-full text-left border-collapse border border-gray-300">
          <Table sx={{ minWidth: 850 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 600 }}>Product Name</TableCell>
                <TableCell style={{ fontWeight: 600 }}>Product Price</TableCell>
                <TableCell style={{ fontWeight: 600 }}>Product Status</TableCell>
                <TableCell style={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {items.map((item) => (
                <tr key={item.id} className="border">
                  <td className="p-4 flex items-center">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover mr-4" />
                    {item.name}
                  </td>
                  <td className="p-4 border">
                    <span className="line-through text-gray-500">${item.price.toFixed(2)}</span>{' '}
                    <span className="text-green-600 ms-2">${item.discountedPrice.toFixed(2)}</span>
                  </td>
                  <td className="p-4 border">{item.status}</td>
                  <td className="p-4 flex items-center gap-2">
                    <button className='bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-3xl'>
                      Add to Cart
                    </button>
                    <IconButton
                      color="error"
                    >
                      <MdDelete className='text-gray-400' />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      </div>
    </>
  )
}

export default WishlistItems
