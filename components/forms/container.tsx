const FormContainer: React.FC<{}> = ({ children }) => {
  return (
    <div className="p-2 m-4 border-2 border-gray-200 rounded-md bg-gray-50">
      {children}
    </div>
  );
};

export default FormContainer;
