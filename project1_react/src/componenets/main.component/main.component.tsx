import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { NavbarComponent } from "../navbar.component/navbar.component";
import PortalComponent from "../page.component/portal.component";
import { LogoutComponent } from "../page.component/logout.component";
import { ProfileComponent } from "../page.component/profile.component";
import { RequestComponent } from "../page.component/request.component";
import { ViewComponent } from "../page.component/view.component";
import { ManagerComponent } from "../page.component/manager.component";
import LoginComponent from "../page.component/login.component";
import { getLocalUser } from "../../remote/auth";
import "./main.component.css";

export const MainComponent: React.FC = () => {
  const [user, setUser] = useState<{}>("");
  useEffect(() => {
    try {
      const u = getLocalUser();
      setUser(u);
    } catch (error) {}
  }, []);
  return (
    <div id="main-component">
      <BrowserRouter>
        <NavbarComponent user={user}></NavbarComponent>
        <main>
          <Switch>
            <Route exact path="/">
              <LoginComponent />
            </Route>
            <Route exact path="/portal">
              <PortalComponent />
            </Route>
            <Route exact path="/view">
              <ViewComponent />
            </Route>
            <Route exact path="/manager">
              <ManagerComponent />
            </Route>
            <Route exact path="/request">
              <RequestComponent />
            </Route>
            <Route exact path="/profile">
              <ProfileComponent user={user} />
            </Route>
            <Route exact path="/logout">
              <LogoutComponent />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
};
