// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { PublicLayout } from "./pages/PublicLayout";
import { Home } from "./pages/public-pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/private-pages/Demo";
import { LoginPage } from "./pages/public-pages/LoginPage";
import { RegisterPage } from "./pages/public-pages/RegisterPage";
import { PrivateLayout } from "./pages/PrivateLayout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

    // Root Route: All navigation will start from here.
    <>
      <Route path="/" element={<PublicLayout />} errorElement={<h1>Not found!</h1>} >
        {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
        <Route path="/" element={<Home />} />
        <Route path="/single/:theId" element={<Single />} />  {/* Dynamic route for single items */}
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/registerpage" element={<RegisterPage />} />
      </Route>

      <Route path="/auth" element={<PrivateLayout/>} errorElement={<h1>Not found!</h1>} >
        <Route path="demo" element={<Demo />} />
      </Route>
    </>
  )
);