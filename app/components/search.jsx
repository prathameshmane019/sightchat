import React from "react";
import {Input} from "@nextui-org/react";

export default function SearchBar() {
  return (
    <div  className=" w-90  md:flex-nowrap  mx-4 md:mb-0 ">
    <Input type="search" variant='underlined' label="Search"  />
  </div>
    
  );
}
