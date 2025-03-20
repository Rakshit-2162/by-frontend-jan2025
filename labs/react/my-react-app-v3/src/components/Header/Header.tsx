import MenuList from "../MenuList/MenuList";


// fn comp with anonymous fn
const Header = () => {
  // must return JSX
  // const { following } = useUserContext(); // Use correct context and key

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            My Big React App!
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <MenuList />
          </div>
          <div>
            <button className="btn btn-light">Following({0})</button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
