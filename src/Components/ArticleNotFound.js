import React from "react";

const ArticleNotFound = () => {
  return (
    <div>
      <div>
        <button type="button" onClick={() => this.props.logoutFunc()}>
          Logout
        </button>
      </div>
      <h1>Sorry Article Not Found</h1>
    </div>
  );
};

export default ArticleNotFound;
