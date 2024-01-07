import React from "react";

import ProductCategory from "../components/ProductCategory";
import ProductDetail from "../components/ProductDetail";
import { Category } from "../pages/Category";
import { Home } from "../pages/Home";

interface Route {
  name: string;
  path: string;
  component: JSX.Element;
  isAnonymous?: boolean;
  isProtected?: boolean;
}

export const routesConfig: Route[] = [
  {
    name: "home",
    path: "/",
    component: <Home />,
  },
  {
    name: 'Product', 
    path: '/product/:id',
    component: <ProductDetail />,
  }, 
  {
    name: 'Categories', 
    path: '/categories/:category',
    component: <ProductCategory />,
  }
];
