import { PrivateRoute } from "@Components/PrivateRoute";
import Shoutouts from "@Containers/Shoutouts";
import React from "react";

const ShoutoutsPage = () => {
  return <Shoutouts />;
};

ShoutoutsPage.getInitialProps = () => {
  return { namespacesRequired: ["common", "error"] };
};


export default PrivateRoute(ShoutoutsPage);