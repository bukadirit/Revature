import React from "react";
import { mount } from "enzyme";
import { PortalComponent } from "../../componenets/page.component/portal.component";
import { act, wait } from "@testing-library/react";
import auth from "../../remote/auth";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { AuthTemplate } from "../../remote/models/otherTemplates";

//jest.mock("../../remotes/auth");
//const mockGetLocalUser = auth.getLocalUser as any;

const routeComponentPropsMock = {
  history: {} as any,
  location: {} as any,
  match: {} as any,
  handleProfile: jest.fn(),
};

describe("<PortalComponent />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render", () => {
    const wrapper = mount(<PortalComponent {...routeComponentPropsMock} />);
    expect(wrapper).toBeDefined();
  });
});
