import React, { useEffect, useState } from 'react';

// Define the retailer information
const retailers = [
  { name: 'Amazon Fashion', url: 'https://www.amazon.com/s?k=', queryParam: '' },
  { name: 'Walmart', url: 'https://www.walmart.com/search/?query=', queryParam: '' },
  { name: 'Target', url: 'https://www.target.com/s?searchTerm=', queryParam: '' },
  { name: 'Macy\'s', url: 'https://www.macys.com/shop/featured/', queryParam: '' },
  { name: 'Nordstrom', url: 'https://www.nordstrom.com/sr?keyword=', queryParam: '' },
  { name: 'Zara', url: 'https://www.zara.com/us/en/search?searchTerm=', queryParam: '' },
  { name: 'H&M', url: 'https://www2.hm.com/en_us/search-results.html?q=', queryParam: '' },
  { name: 'Gap', url: 'https://www.gap.com/browse/search.do?searchText=', queryParam: '' },
  { name: 'Uniqlo', url: 'https://www.uniqlo.com/us/en/search?q=', queryParam: '' },
  { name: 'ASOS', url: 'https://www.asos.com/us/search/?q=', queryParam: '' },
  { name: 'Shein', url: 'https://us.shein.com/search?keyword=', queryParam: '' },
  { name: 'Forever 21', url: 'https://www.forever21.com/us/shop/Search/#brm-search?search=', queryParam: '' },
  { name: 'Lululemon', url: 'https://shop.lululemon.com/search?Ntt=', queryParam: '' },
  { name: 'Nike', url: 'https://www.nike.com/w?q=', queryParam: '' },
  { name: 'Adidas', url: 'https://www.adidas.com/us/search?q=', queryParam: '' },
  { name: 'Urban Outfitters', url: 'https://www.urbanoutfitters.com/search?q=', queryParam: '' },
  { name: 'Zalando', url: 'https://www.zalando.com/search?q=', queryParam: '' },
  { name: 'Boohoo', url: 'https://us.boohoo.com/search?q=', queryParam: '' },
  { name: 'Next', url: 'https://www.next.co.uk/search?w=', queryParam: '' },
  { name: 'Topshop', url: 'https://www.topshop.com/en/tsuk/category/', queryParam: 'searchTerm' }, // Note: Topshop might require a different approach or may no longer be relevant due to acquisition by ASOS.
];

// Function to generate search URL
const generateSearchUrl = (baseUrl: string, query: string, queryParam: string): string => {
  return `${baseUrl}${queryParam ? queryParam + '=' : ''}${encodeURIComponent(query)}`;
};

// RetailerCard component
const RetailerCard: React.FC<{ retailer: typeof retailers[0]; query: string }> = ({ retailer, query }) => {
  const searchUrl = generateSearchUrl(retailer.url, query, retailer.queryParam);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 border border-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{retailer.name}</div>
        <a href={searchUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-800">
          Search for items
        </a>
      </div>
    </div>
  );
};

const RetailersDisplay: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
    const [randomRetailers, setRandomRetailers] = useState<typeof retailers>([]);
  
    useEffect(() => {
      // Function to get 10 random retailers
      const getRandomRetailers = (retailers: any, count: number) => {
        const shuffled = [...retailers].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
      };
  
      setRandomRetailers(getRandomRetailers(retailers, 10));
    }, [searchQuery]); // Re-run when searchQuery changes, if needed
  
    // Adjusted styles for horizontal scrolling and one item per row
    return (
      <div className="flex overflow-x-auto py-4" style={{ scrollbarWidth: 'none' }}> {/* Hide scrollbar for cleaner look */}
        {randomRetailers.map((retailer, index) => (
          // Wrap each RetailerCard in a div with flex-none to prevent flex shrink/grow
          <div key={index} className="flex-none w-full sm:w-auto"> 
            <RetailerCard retailer={retailer} query={searchQuery} />
          </div>
        ))}
      </div>
    );
  };
  
  export default RetailersDisplay;