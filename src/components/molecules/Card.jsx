const Card = ({ children, title }) => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {title && <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>}
      <div className="text-gray-600">{children}</div>
    </div>
);

export default Card;
