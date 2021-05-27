const FormContainer: React.FC<{}> = ({ children }) => {
  return (
    <div className="m-4 p-2 border-2 rounded-md bg-accent-light">
      {children}
    </div>
  );
};

export default FormContainer;
