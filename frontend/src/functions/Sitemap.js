

import axios from "axios";
import { siteMapSet } from "../redux/manager-reducer";



export const generateSitemap = async(dispatch) => {



    

    const response = await axios.get('/api/sitemaps/')

    console.log(response.data.sitemapsid)

    const staticRoutes  = [
      "/",
      "/about",      
      "/sweets",      
      "/contact",      
    ];



    let dynamicRoutes = [];

    dynamicRoutes = response.data.sitemapsid.map((prodid) => {
        return {route: `/sweet/${prodid.id}`};
    })


    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticRoutes
        .map((route) => {
          const url = `https://yumearth.kz${route}`;
          return `
            <url>
              <loc>${url}</loc>
              <changefreq>weekly</changefreq>
              <priority>0.9</priority>
            </url>
          `;
        })
        .join("")}
      ${dynamicRoutes
        .map(({ route }) => {
          const url = `https://yumearth.kz${route}`;
          return `
            <url>
              <loc>${url}</loc>             
              <changefreq>weekly</changefreq>
              <priority>0.9</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>`;

    siteMapSet(dispatch, sitemap)

        return true;

  }

  