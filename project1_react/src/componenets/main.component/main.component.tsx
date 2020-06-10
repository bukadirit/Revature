import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { NavbarComponent } from "../navbar.component/navbar.component";
import { LoginComponent } from "../page.component/login.component";
import { PortalComponent } from "../page.component/portal.component";
import "./main.component.css";

export const MainComponent: React.FC = () => {
  return (
    <div id="main-component">
      <BrowserRouter>
        <NavbarComponent></NavbarComponent>
        <main>
          <Switch>
            <Route exact path="/">
              <LoginComponent />
            </Route>
            <Route exact path="/portal">
              <PortalComponent />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
};
