"use client";

import useConversation from "@/app/hooks/useConverstion";
import { FullMessageType } from "@/app/types";
import { useState, useRef, useEffect } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface BodyProps {
  initialMessages: FullMessageType[]
}

const Body:React.FC<BodyProps> = ({
  initialMessages
}) => {
  const [ messages, setMessages ] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId]);

  useEffect(()=> {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      setMessages((current) => {
        if (find(current, {id: message.id})){
          return current
        }

        return [...current, message]
      })
    }
    pusherClient.bind('messages:new', messageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new', messageHandler)
    }
  }, [conversationId])

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
        <div ref={bottomRef} className="pt-24" />
    </div>
  )
}

export default Body