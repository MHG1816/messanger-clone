"use client";

import { User } from "@prisma/client";

import UserBox from "./UserBox";


interface UsersListProps {
    items: User[]
};

const UsersList: React.FC<UsersListProps> = ({
    items
}) => {
  return (
    <aside
        className="
            fixed
            inset-y-0
            pb-20
            lg:pb-0
            lg:left-20
            lg:w-80
            block
            overflow-y-auto
            border-r
            border-gray-200
            w-full
            left-0

        ">
            <div className="px-5">
                <div className="flex-col">
                    <div className="
                        text-2xl
                        font-bold
                        text-neutral-800
                        py-4
                    ">
                        People
                    </div>
                </div>
                {items.map((item) => (
                    <UserBox 
                        key={item.id}
                        data={item}
                    />
                ))}
            </div>
    </aside>
  )
}

export default UsersList