"use client";

import { Box, Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import AIChat from "./components/AIChat";
import UserChat from "./components/UserChat";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm the Headstarter support assistant. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState("");

  const fixResponse = () => {
    console.log("fixed");
    console.log(messages);
    console.log(messages.length);
    const text = messages[messages.length - 1].content;
    var obj = {};
    try {
      obj = JSON.parse(text);
    } catch (e) {
      console.log(e);
      console.log(messages);
      obj = {
        choices: [{ message: { content: "error" } }],
      };
    }
    console.log(obj);
    setMessages((messages) => {
      let lastMessage = messages[messages.length - 1];
      let otherMessages = messages.slice(0, messages.length - 1);
      return [
        ...otherMessages,
        {
          ...lastMessage,
          content: obj.choices[0].message.content,
        },
      ];
    });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return; // Don't send empty messages

    setMessage("");
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    console.log("CLICKED");

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "meta-llama/llama-3.1-8b-instruct:free",
            messages: [{ role: "user", content: message }],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        console.log("HERE");
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        console.log(JSON.parse(text));
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            {
              ...lastMessage,
              content:
                lastMessage.content +
                JSON.parse(text).choices[0].message.content,
            },
          ];
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content:
            "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    }
    console.log("DONE");
    console.log(messages);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <div className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px]"> */}
      <div className="right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[75vw] h-[80vh]">
        {/* <!-- Heading --> */}
        <div className="flex flex-col space-y-1.5 pb-6">
          <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
          <p className="text-sm text-[#6b7280] leading-3">
            Powered by Mendable and Vercel
          </p>
        </div>

        {/* <!-- Chat Container --> */}
        <div className="pr-4 h-[474px]">
          {/* <!-- Chat Message AI --> */}
          {/* <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
            <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
              <div className="rounded-full bg-gray-100 border p-1"></div>
            </span>
            <p className="leading-relaxed">
              <span className="block font-bold text-gray-700">AI </span>Hi, how
              can I help you today?
            </p>
          </div> */}
          <AIChat></AIChat>

          {/* <!--  User Chat Message --> */}
          {/* <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
            <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
              <div className="rounded-full bg-gray-100 border p-1"></div>
            </span>
            <p className="leading-relaxed">
              <span className="block font-bold text-gray-700">You </span>fewafef
            </p>
          </div> */}
          <UserChat></UserChat>
          {/* <!-- Ai Chat Message  --> */}
          <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
            <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
              <div className="rounded-full bg-gray-100 border p-1"></div>
            </span>
            <p className="leading-relaxed">
              <span className="block font-bold text-gray-700">AI </span>Sorry, I
              couldn't find any information in the documentation about that.
              Expect answer to be less accurateI could not find the answer to
              this in the verified sources.
            </p>
          </div>
        </div>
        {/* <!-- Input box  --> */}
        <div className="flex items-center pt-0">
          <form className="flex items-center justify-center w-full space-x-2">
            <input
              className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
              placeholder="Type your message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
              onClick={sendMessage}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
