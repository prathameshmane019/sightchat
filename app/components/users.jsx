import React from "react";
import {Avatar, AvatarIcon} from "@nextui-org/react";

export default function Users() {
  return (
    <div className="flex  items-center mx-4 my-1 border-2 p-3 rounded-xl bg-transperent">
      <Avatar
        icon={<AvatarIcon />}
        classNames={{
          base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
          icon: "text-black/80",
        }}

      />
      <div className="ml-6">
        <div>Prathamesh Mane</div>
        <div>Available</div>
      </div>
    </div>
  );
}