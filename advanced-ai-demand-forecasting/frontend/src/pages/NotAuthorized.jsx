import { Link } from "react-router-dom";

const NotAuthorized = () => {
  return (
    <div className="page-center">
      <h1>403</h1>
      <h2>Not Authorized</h2>
      <p>You do not have permission to access this page.</p>
      <Link to="/">Go to Dashboard</Link>
    </div>
  );
};

export default NotAuthorized;