const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        padding: "12px",
        borderRadius: "12px",
        border: "1px solid #d1d5db",
        width: "100%",
        marginBottom: "20px",
      }}
    />
  );
};

export default SearchBar;