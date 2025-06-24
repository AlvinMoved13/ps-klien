const Button = ({ children, onClick, type = "button" }) => (
    <button 
      type={type} 
      onClick={onClick} 
      className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors duration-200 disabled:opacity-50"
    >
      {children}
    </button>
);

export default Button;
