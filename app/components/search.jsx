import React from "react";
import {Input} from "@nextui-org/react";
import {SearchIcon} from "./SearchIcon";

export default function SearchBar() {
  return (
    <div  className=" w-full  md:flex-nowrap  mx-4 md:mb-0 ">
    
    <Input type="search" variant='underlined' label="Search"  />
  </div>
    
  );
}
