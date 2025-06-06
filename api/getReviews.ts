import { sendToTelegram } from "../lib/telegram";

let lastFeedbackId = 0;

export const config = {
  runtime: "edge"
};

export default async function handler() {
  const apiKey = process.env.UZUM_API_KEY!;
  const res = await fetch("https://api.seller.uzum.uz/api/rest/feedback/list", {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    }
  });

  const json = await res.json();
  const feedbacks = json?.data?.feedbacks || [];

  const newFeedbacks = feedbacks
    .filter((fb: any) => fb.feedbackId > lastFeedbackId)
    .sort((a: any, b: any) => a.feedbackId - b.feedbackId);

  for (const fb of newFeedbacks) {
    const message = `🛒 *${fb.productTitle}*
⭐️ *${fb.score}/5*
🗓 ${new Date(fb.createdAt).toLocaleDateString()}
💬 ${fb.text || "Без текста"}
🔗 https://uzum.uz/product/${fb.productId}`;

    await sendToTelegram(message);
    lastFeedbackId = fb.feedbackId;
  }

  return new Response("OK", { status: 200 });
}
