import React from "react";

export default function AccessDeny() {
  console.log("Acces Denied called");
  return (
    <div className="container">
      <div className="access-deny">
        <h1>Access is Denied</h1>

        <h1>Forbidden 403</h1>
      </div>
    </div>
  );
}
