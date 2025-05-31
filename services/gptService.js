const { OpenAI } = require("openai");
const dotenv = require("dotenv");
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getDiagnosisSuggestions(symptomsText) {
  const prompt = `
  A patient presents with the following symptoms: ${symptomsText}.
  What are the most likely diagnoses? Suggest next steps (labs, imaging, referrals) and red flags if any. 
  Format your response in bullet points.`;

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL,
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content.trim();
}

module.exports = { getDiagnosisSuggestions };
