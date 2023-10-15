import React, { useEffect, useState } from "react";
import Typed from "react-typed";
import Spinner from '@atlaskit/spinner'

const subTexts = [
  "A.I that can allocate customer issues to the right teams",
  "A.I that can be the first responder to you customers",
  "A.I that can speak the language of your customers",
  "A.I that can be your Customer Support, while your team handles the rest ",
];

const CoverPage = () => {
  return (
    <div className="cover-container">
      <div className="cover-card">
        <div className="cover-title">{"SPOTHELP"}</div>
        <div className="cover-subtitle text-secondary">
          {"🤖 "}<Typed
            strings={subTexts}
            typeSpeed={35}
            backSpeed={10}
            backDelay={20}
            loop
            smartBackspace
          />
        </div>     
      </div>
    </div>
  );
};

export default CoverPage;
