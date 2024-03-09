import React from "react";
import Nav from "./header/Nav";
import RightSidebar from "./header/RightSidebar";

export default function Header() {
   return (
      <div>
         <RightSidebar />
         <Nav />
      </div>
   );
}
