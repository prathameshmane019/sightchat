import { Avatar, AvatarIcon } from "@nextui-org/react";
import { Suspense } from "react";
import ProfileSkeleton from "./skeletons/user";
export default function App({ user }) {
 
  return (
    <div className="h-[7vh] py-1 w-[74vw]  flex  bg-secondary-700 bg-opacity-10  backdrop-filter backdrop-blur-sm" >
      <div className="ml-3 "><Avatar
        icon={<AvatarIcon />}
        classNames={{
          base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
          icon: "text-black/80",
        }}
      />
      </div>
      <Suspense fallback={ProfileSkeleton}>
      <div className="ml-3 my-auto">{user?.name}</div>
      </Suspense>
    </div>
  );
}
