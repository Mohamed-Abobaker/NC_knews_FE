import React from "react";

const NotFound = () => {
  return (
    <div>
      <div>
        <button type="button" onClick={() => this.props.logoutFunc()}>
          Logout
        </button>
      </div>
      <h1>404 Page Not Found</h1>
    </div>
  );
};

export default NotFound;
