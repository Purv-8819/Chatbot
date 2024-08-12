export default async function handler(req, res) {
  const apiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST", // or 'POST', 'PUT', etc.
    headers: {
      Authorization:
        "Bearer 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",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [{ role: "user", content: "What is the meaning of life?" }],
    }),
  });

  const data = await apiRes.json();

  res.status(200).json(data);
}
