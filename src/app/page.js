"use client";
const APIKEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;

import { useEffect, useRef, useState } from "react";
import AIChat from "./components/AIChat";
import UserChat from "./components/UserChat";
import Loading from "./components/Loading";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm the Headstarter support assistant. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Scroll to the section after count reaches 5
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log("HERE");
  }, messages);

  const sendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!message.trim()) return; // Don't send empty messages

    setMessage("");
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${APIKEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "meta-llama/llama-3.1-8b-instruct:free",
            messages: [
              {
                role: "system",
                content:
                  "You are a helping chatbot who always responds markdown",
              },
              { role: "user", content: message },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      var val;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        val = value;
      }

      const text = decoder.decode(val);

      setLoading(false);
      setMessages((messages) => {
        let lastMessage = messages[messages.length - 1];
        let otherMessages = messages.slice(0, messages.length - 1);
        return [
          ...otherMessages,
          {
            ...lastMessage,
            content:
              lastMessage.content +
              JSON.parse(text.trim()).choices[0].message.content,
          },
        ];
      });
    } catch (error) {
      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content:
            "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    }
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
        <div id="container" className="p-4 h-5/6 overflow-y-scroll">
          <ul>
            {messages.map((item, id) => (
              <li key={id}>
                {item.role == "user" ? (
                  <UserChat text={item.content} />
                ) : (
                  <AIChat text={item.content} />
                )}
              </li>
            ))}
            <div ref={sectionRef}></div>
          </ul>
        </div>

        {/* <!-- Input box  --> */}
        <div className="flex items-center pt-0">
          <form className="flex items-center justify-center w-full space-x-2">
            {loading ? (
              <Loading />
            ) : (
              <input
                className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                placeholder="Type your message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
            )}
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
