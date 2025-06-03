import React from "react";
import { Redirect } from "expo-router";

const Index = () => {
  // Redirect to the tabs route
  return <Redirect href="/(tabs)" />;
};

export default Index;
