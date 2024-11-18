import React from 'react'
import { MoonLoader } from 'react-spinners';

function Loading() {
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <MoonLoader />
        </div>
    )
}

export default Loading;