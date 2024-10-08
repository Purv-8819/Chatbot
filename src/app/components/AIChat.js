import Markdown from "react-markdown";

export default function AIChat(props) {
  return (
    <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
      <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
        <div className="rounded-full bg-gray-100 border p-1"></div>
      </span>
      <div className="leading-relaxed">
        <span className="block font-bold text-gray-700">AI </span>
        <Markdown>{props.text}</Markdown>
      </div>
    </div>
  );
}
