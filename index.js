const { Command } = require("commander");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const program = new Command();
program.name("hey").description("CLI to ask questions to AI").version("1.0.0");
program
  .command("hey")
  .description("ask question to AI from CLI")
  .argument("<string>", "string to ask")
  .action((str) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API || "");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = str;

    async function ask(prompt) {
      try {
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
      } catch (error) {
        console.error("Error generating content:", error);
      }
    }

    ask(prompt);
  });

program.parse();
