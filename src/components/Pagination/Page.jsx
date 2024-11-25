import { Pagination, Stack } from '@mui/material'
import React from 'react';
import "./page.css"

const Page = ({
    totalPages,
    handlePageChange
}) => {
    return (
        <>
            <Stack spacing={5}>
                <Pagination
                    count={totalPages}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                    size="small"
                    style={{ color: "orange" }}
                />
            </Stack>
        </>
    )
}

export default Page
