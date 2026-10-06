import "./Productfilter.css";

const Productfilter = ({ title, options, name }) => {
  return (
    <section className="filter-card">
      <h3 className="filter-title">{title}</h3>

      <div className="filter-options">
        {options.map((item) => (
          <label key={item.id} className="filter-option">
            <input
              type="radio"
              name={name}
              value={item.value}
            />

            <span>{item.label}</span>
          </label>
        ))}
      </div>
    </section>
  );
};

export default Productfilter;