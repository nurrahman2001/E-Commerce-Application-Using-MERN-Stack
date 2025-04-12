   export const CartItem = ({ id, title, brand, price, quantity, thumbnail, productId, category, size, onDelete, onUpdateQuantity }) => {
    return (
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-white rounded-lg shadow mb-4">
      
        <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
          <img 
            src={thumbnail || "https://via.placeholder.com/100"} 
            alt={title} 
            className="w-20 h-20 object-cover rounded-md mr-4"
          />
          <div className="mt-2 sm:mt-0">
            <h3 className="font-medium text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{brand} • {category}</p>
            {(category === "Clothes" || category === "Shoes") && size && (
              <p className="text-sm text-gray-500">Size: {size}</p>
            )}
            <span className="text-lg text-gray-700 font-bold mt-1">${price}</span>
            <span className=' text-gray-500 px-2 text-sm'>(Excluding all taxes)</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button 
              onClick={() => quantity > 1 && onUpdateQuantity(id, quantity - 1)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="px-3 py-1">{quantity}</span>
            <button 
              onClick={() => onUpdateQuantity(id, quantity + 1)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            >
              +
            </button>
          </div>
          <button 
            onClick={() => onDelete(id)}
            className="text-red-500 hover:text-red-700"
            aria-label="Remove item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    );
  };
  