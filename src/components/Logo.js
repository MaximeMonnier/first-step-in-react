import React from "react";

const Logo = () => {
  return (
    <div className="container">
      <div className="logo">
        {/* Les images importées depuis la balise IMG sont accessibles dans "public" */}
        <img src="./franck.jpg" alt="francklogo" />
        <div className="container-text">
          <p>
            " C'est quand la personne dort qu'on réalise la personnalité de là
            personne"
          </p>
          <p className="auteur">Franck Oliver .</p>
        </div>
      </div>
    </div>
  );
};

export default Logo;
