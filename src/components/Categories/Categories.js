import './Categories.scss';

function Categories({ onCategoryClick }) {
    const categories = [
      { name: "Web dev", endpoint: "webdev" },
      { name: "App dev", endpoint: "appdev" },
      { name: "Game dev", endpoint: "gamedev" },
      { name: "Hacking", endpoint: "hacking" },
      { name: "Kukoro", endpoint: "kukoro" },
    ];
  
    const handleClick = (category) => {
      onCategoryClick(category.endpoint); 
    };
  
    return (
      <div className="categories_container">
        <h1 className="categories_title">Explorar</h1>
        <div className="categories_gridcontainer">
          {categories.map((category, index) => (
              <button key={index} className="category-button" onClick={() => handleClick(category)}>
                {category.name}
              </button>
          ))}
        </div>
      </div>
    );
  }
  

export default Categories;