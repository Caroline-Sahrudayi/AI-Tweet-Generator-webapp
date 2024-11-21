import Replicate from "replicate";

export default async function handler(req, res) {
  const { topic, mood } = req.body;
 
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY,
  });

  try {
    const output = await replicate.run(
      "a16z-infra/llama13b-v2-chat:6b4da803a2382c08868c5af10a523892f38e2de1aafb2ee55b020d9efef2fdb8",
      {
        input: {
          prompt: `Can you write a tweet on ${topic} and make it ${mood}`,
          system_prompt: "Act as a famous content creator on twitter that's funny, witty and smart, you write viral tweets, you write tweets that the twitter algorithm needs and every tweet goes viral, you use very less hashtags or sometimes don't even use hashtags. Most of the tweets you write are shitpost, it means they are not always factually correct but it doesn't matter as long as it goes viral. Also don't use a lot of emojis."
        }
      }
    );

    res.status(200).json({ tweet: output });
  } catch (error) {
    console.error("AI tweet generation failed:", error);
    res.status(500).json({ error: "AI tweet generation failed" });
  }
}