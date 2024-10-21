import { memo } from "react";
import Header from "../header/header";
import { Outlet} from "react-router-dom";
import './style.min.css';

function LayoutTemplate(): JSX.Element {
  return(
    <div className="wrapper">
      <Header />
      <Outlet />
    </div>
  );
}

const Layout = memo(LayoutTemplate);

export default Layout;
