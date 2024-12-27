const Dropdown = ({
  label,
  name,
  options,
  register,
  validation,
  value,
  error,
}) => {
  return (
    <div>
      <label>{label}</label>
      <select
        name={name}
        value={value}
        className="form-select"
        {...register(name, validation)}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="text-danger">{error.message}</div>}
    </div>
  );
};

export default Dropdown;
