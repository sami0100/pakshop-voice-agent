import { useEffect, useState } from "react";

import {
  getRevenue,
  getTopCustomers,
  getTrendingProducts,
  getLowStockItems,
} from "../services/adminService";


function AdminDashboard() {

  const [revenue, setRevenue] = useState(null);

  const [customers, setCustomers] = useState([]);

  const [products, setProducts] = useState([]);

  const [lowStock, setLowStock] = useState([]);



  useEffect(() => {

    async function loadDashboard() {

      try {

        const [
          revenueData,
          customerData,
          productData,
          inventoryData,
        ] = await Promise.all([

          getRevenue(),

          getTopCustomers(),

          getTrendingProducts(),

          getLowStockItems(),

        ]);


        setRevenue(revenueData);

        setCustomers(customerData);

        setProducts(productData);

        setLowStock(inventoryData);


      } catch (error) {

        console.error(
          "Dashboard loading failed:",
          error
        );

      }

    }


    loadDashboard();


  }, []);




  return (

    <div
      style={{
        padding: "40px",
      }}
    >

      <h1>
        PakShop Admin Dashboard
      </h1>



      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "30px",
        }}
      >


        <div>

          <h3>
            Revenue
          </h3>

          <p>
            {revenue
              ? `$${revenue.totalRevenue}`
              : "Loading..."
            }
          </p>

        </div>



        <div>

          <h3>
            Orders
          </h3>

          <p>
            {revenue
              ? revenue.totalOrders
              : "Loading..."
            }
          </p>

        </div>



        <div>

          <h3>
            Top Customers
          </h3>

          <p>
            {customers.length}
            {" "}
            customers
          </p>

        </div>



        <div>

          <h3>
            Low Stock
          </h3>

          <p>
            {lowStock.length}
            {" "}
            items
          </p>

        </div>


      </div>



      <h2
        style={{
          marginTop: "40px",
        }}
      >
        Trending Products
      </h2>


      {
        products.map((product) => (

          <div key={product._id}>

            Product:
            {" "}
            {product._id}

            {" | "}

            Sold:
            {" "}
            {product.unitsSold}

          </div>

        ))
      }



    </div>

  );

}


export default AdminDashboard;