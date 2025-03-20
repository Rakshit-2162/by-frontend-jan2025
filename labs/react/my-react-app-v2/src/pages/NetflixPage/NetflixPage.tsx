import LatestVideo from "./LatestVideo/LatestVideo";

const NetflixPage = () => {

  return (
    <div className="container">
      <h1>Welcome to Netflix</h1>
      <h2>Latest Videos</h2>
      <div className="row">
        <div className="col-md-4">
          <LatestVideo
            title="Arg Vs Fra FIFA 2022 Final"
            thumbnailUrl="https://via.placeholder.com/280x200"
            views="2M"
            publishedOn="6 days ago"
          >
            Watch the highlights of Argentina and France played in Qatar.
          </LatestVideo>
        </div>
        <div className="col-md-4">
          <LatestVideo
            title="CSK Vs KKR IPL 2023"
            thumbnailUrl="https://via.placeholder.com/280x200"
            views="4M"
            publishedOn="2 days ago"
          >
            Watch the highlights CSK Vs KKR IPL 2023.
          </LatestVideo>
        </div>
        <div className="col-md-4">
          <LatestVideo
            title="GT Vs MI IPL 2023"
            thumbnailUrl="https://via.placeholder.com/280x200"
            views="1.2M"
            publishedOn="5 hours ago"
          >
            Watch the highlights GT Vs MI IPL 2023.
          </LatestVideo>
        </div>
      </div>
    </div>
  );
}

export default NetflixPage