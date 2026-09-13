import { createAdminTools } from "./tools";


export async function getAdminBusinessContext() {


  const tools = createAdminTools();


  const results = {};



  for (const tool of tools) {


    try {


      const data = await tool.execute(
        tool.name === "get_revenue_by_period"
          ? { days: 30 }
          : {}
      );


      results[tool.name] = data;


    } catch(error) {


      console.error(
        `Tool failed: ${tool.name}`,
        error
      );


      results[tool.name] = null;


    }


  }



  return results;


}