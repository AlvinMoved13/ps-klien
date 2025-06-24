const Input = ({ label, type = "text", name, placeholder }) => (
    <div className="flex flex-col space-y-2 w-full">
      {label && <label htmlFor={name} className="text-sm font-medium text-gray-700">{label}</label>}
      <input 
        type={type} 
        id={name} 
        name={name} 
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
      />
    </div>
);

export default Input;
