import React, { useEffect } from "react";
import * as auth from "../../remote/auth";

export const LogoutComponent: React.FC = () => {
  useEffect(() => {
    auth.removeLocalUser();
    window.location.href = "/";
  }, []);
  return null;
};
