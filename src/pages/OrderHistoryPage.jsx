import React from 'react'
import { Layout, OrderHistory } from '../components/index'

function OrderHistoryPage() {
  return (
    <>
      <section style={{ backgroundColor: "#f7f7fa" }}>
        <Layout>
          <div className="container" style={{ height: "100%", paddingTop: "2rem" }}>
            <OrderHistory />
          </div>
        </Layout>
      </section>
    </>
  )
}

export default OrderHistoryPage
