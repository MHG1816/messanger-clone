"use client";

import useConversation from "@/app/hooks/useConverstion";
import { FullMessageType } from "@/app/types";
import { useState, useRef } from "react";
import MessageBox from "./MessageBox";

interface BodyProps {
  initialMessages: FullMessageType[]
}

const Body:React.FC<BodyProps> = ({
  initialMessages
}) => {
  const [ messages, setMessages ] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  return (
    <div className="flex-1 overflow-y-auto">
        {
          messages.map((message, i) => (
            <MessageBox 
              key={message.id}
              data={message}
              isLast={i === messages.length - 1}
            />
          )) 
        }
    </div>
  )
}

export default Body