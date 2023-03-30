import { PrivateRoute } from "@Components/PrivateRoute";
import Jobs from "@Containers/Jobs";
import React from "react";


const JobsPage = () => {
  return <Jobs />;
};

JobsPage.getInitialProps = () => {
  return { namespacesRequired: ["common", "error"] };
};


export default PrivateRoute(JobsPage);
