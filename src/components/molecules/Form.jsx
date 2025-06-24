const Form = ({ onSubmit, children, className = "" }) => (
  <form
    onSubmit={onSubmit}
    className={`w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${className}`}
  >
    {children}
  </form>
);

export default Form;
