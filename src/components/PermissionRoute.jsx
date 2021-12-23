import React from 'react';

// @see https://github.com/AlanWei/react-acl-router
import AclRouter from 'react-acl-router';

import { useSelector } from 'react-redux';

import { unAuthorizedRoutes, authorizedRoutes } from '../config/routerRole';

import { _getUserRole } from '../lib/helper';

import AuthLayout from '../layout/AuthLayout';
import NormalLayout from '../layout/NormalLayout';

import NotFound from '../pages/NotFound';

const PermissionRoute = () => {
  const { permission } = useSelector((state) => state.user);
  // const { account } = loginInfo;
  let role;

  if (permission) {
    role = permission;
  } else {
    role = _getUserRole();
  }

  // account ? role = account : role = _getUserRole();

  return (
    <AclRouter
      authorities={role}
      authorizedRoutes={authorizedRoutes}
      authorizedLayout={AuthLayout}
      normalRoutes={unAuthorizedRoutes}
      normalLayout={NormalLayout}
      notFound={NotFound}
    />
  );
};

export default PermissionRoute;
