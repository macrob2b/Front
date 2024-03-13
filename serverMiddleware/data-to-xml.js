import axios from 'axios';

export default async (req, res, next) => {
  const { url } = req;

  // Check if the request is for sitemap
  if (url.startsWith('/sitemap')) {
    // Example: Set content type to XML
    res.setHeader('Content-Type', 'application/xml');

    // Extract the content type from the URL
    const contentType = url.substring(url.lastIndexOf('/') + 1);


    var xmlData = "";
    if (contentType != 'sitemap') {
      // Fetch data based on content type
      const data = await fetchDataFromServer(contentType);

      // Convert data to XML format
      xmlData = convertDataToXML(data, contentType);
    }
    else {
      xmlData = generateDefaultSitemap();
    }

    // Send XML response
    res.end(xmlData);
  } else {
    next();
  }
};

async function fetchDataFromServer(contentType) {
  // Fetch paginated data from the third-party server
  const itemsPerPage = 50; // Adjust as per your pagination logic
  let currentPage = 1;
  let allData = [];
  let apiUrl;



  // Determine the API URL based on the content type

  switch (contentType) {
    case 'product':
      apiUrl = `${process.env.API_URL}/api/all_product_list`; // Adjust API URL for papers
      break;
    case 'company':
      apiUrl = `${process.env.API_URL}/api/all_company_list`; // Adjust API URL for qa
      break;
    default:
      // Return empty array for unknown content type
      return [];
  }




  const response = await axios.post(apiUrl);
  const data = response.data;
  // Add fetched data to the array

  return data;



}

function convertDataToXML(data, contentType) {


  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  data.forEach(item => {
    if (contentType == "product")
      xml += `<url>
            <loc>https://macrob2b.com/product-details/${item._id}</loc>
            <lastmod>${formatDate(item.updated_at)}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
        </url>`;
    else if (contentType == "company")
      xml += `<url>
            <loc>https://macrob2b.com/company/${item.username}</loc>
            <lastmod>${formatDate(item.updated_at)}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
        </url>`;
  });
  xml += '\n</urlset>';
  return xml;
}



function generateDefaultSitemap() {
  const simpleUrls = [
    'https://macrob2b.com',
    'https://macrob2b.com/product-list',
    'https://macrob2b.com/user/product/add',
    'https://macrob2b.com/login',
    'https://macrob2b.com/register',
    'https://macrob2b.com/company-list',
    'https://macrob2b.com/help',
    'https://macrob2b.com/buying-leads',
    'https://macrob2b.com/selling-leads',
    'https://macrob2b.com/about-me',
    'https://macrob2b.com/contact-us',
    'https://macrob2b.com/help',
    'https://macrob2b.com/terms-and-conditions',
    'https://macrob2b.com/privacy-policy',
    'https://macrob2b.com/category-list',
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  simpleUrls.forEach(url => {
    xml += `<url>
          <loc>${url}</loc>
          <changefreq>monthly</changefreq>
          <priority>0.5</priority>
      </url>`;
  });
  xml += '\n</urlset>';
  return xml;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


