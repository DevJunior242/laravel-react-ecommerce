import React from "react";
import Nof from "./Nof";
import Account from "./Account";
import ProfileUpdate from "../../Api/ProfileUpdate";

function Setting() {
  return (
    <div>
       <Nof />
      <ProfileUpdate />
    </div>
  );
}

export default Setting;
