import {ChatOpenAI} from '@langchain/openai';
import dotenv from 'dotenv';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables';

dotenv.config();

async function generateResponse(title) {
    const promptTemplate = new PromptTemplate({
        template:`You are a helpful assistant. Write a detailed note.
         Keep it under 50 words and ensure it does not cut off mid-sentence, informative note based on the following title.
        Title:{title} 
        
        Content:`,
        inputVariables: ['title']
    });
    console.log("Prompt Template", promptTemplate);
    const llm = new ChatOpenAI({temperature: 0.7, openAIApiKey: process.env.OPENAI_API_KEY, model: "gpt-4o-mini",maxTokens:100});
    const outputParser = new StringOutputParser();

    const lcelChain =RunnableSequence.from([promptTemplate, llm, outputParser]);
    const response = await lcelChain.invoke({title});
    console.log("Response", response);
    return response
}

const title ="My first note";
generateResponse(title);
export { generateResponse };