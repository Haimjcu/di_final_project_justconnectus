import { PrivateRoute } from "@Components/PrivateRoute";
import Shoutouts from "@Containers/Shoutouts";
import React from "react";

const ShoutoutsPage = () => {
  return <Shoutouts />;
};


export default PrivateRoute(ShoutoutsPage);