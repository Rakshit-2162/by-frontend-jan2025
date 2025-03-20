import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold text-body-emphasis">
          Welcome to My Big React App!
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Quickly design and customize responsive mobile-first sites with
            Bootstrap, the world’s most popular front-end open source toolkit,
            featuring Sass variables and mixins, responsive grid system,
            extensive prebuilt components, and powerful JavaScript plugins.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to='/netflix'>
                <button type="button" className="btn btn-primary btn-lg px-4 gap-3" >
                Browse Netflix
                </button>
            </Link>
            <Link to='/crud'>
                <button type="button" className="btn btn-outline-secondary btn-lg px-4">
                  Try CRUD
                </button>
            </Link>
          </div>
        </div>
      </div>

    </>
  );
};

export default HomePage;
