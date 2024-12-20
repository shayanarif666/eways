import React from 'react'

const StepList = () => {
    return (
        <div className="stepper">
            <div className="step active">
                <div className="circle">
                    <span>&#10003;</span> {/* Checkmark */}
                </div>
                <p>Shipping</p>
            </div>
            <div className="line"></div>
            <div className="step">
                <div className="circle">
                    <span>2</span>
                </div>
                <p>Payment</p>
            </div>
        </div>
    )
}

export default StepList;
