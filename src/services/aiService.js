import { getAdminBusinessContext } from "../agents/adminAgent";



export async function askAdminAI(question) {


  const context =
    await getAdminBusinessContext();



  /*
    Temporary response layer.

    Later this will be replaced with:
    OpenAI API / AIROMOB Voice Agent
  */



  if (
    question
    .toLowerCase()
    .includes("restock")
  ) {


    const inventory =
      context.get_low_stock_items;


    return `
      I found ${inventory?.length || 0}
      inventory items requiring attention.
      You should review low stock products
      before they impact sales.
    `;

  }






  if (
    question
    .toLowerCase()
    .includes("sales")
    ||
    question
    .toLowerCase()
    .includes("revenue")
  ) {


    return `
      Your current revenue is
      $${context.get_revenue?.totalRevenue || 0}.
      Your store is showing positive sales activity.
    `;

  }





  return `
    Your business is currently being monitored.

    Revenue:
    $${context.get_revenue?.totalRevenue || 0}

    Top Product:
    ${
      context
      .get_trending_products?.[0]
      ?.name
      ||
      "Not available"
    }

    Inventory Alerts:
    ${
      context
      .get_low_stock_items?.length
      ||
      0
    }

  `;


}