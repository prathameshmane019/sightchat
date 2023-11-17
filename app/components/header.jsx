import { Avatar, AvatarIcon } from "@nextui-org/react";
export default function App({ user }) {
  return (
    <div className="h-[7vh] py-1 w-[100%]  flex bg-white">
      <div className="ml-3 "><Avatar
        icon={<AvatarIcon />}
        classNames={{
          base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
          icon: "text-black/80",
        }}
      />
      </div>
      <div className="ml-3 my-auto">{user?.name}</div>
    </div>
  );
}
