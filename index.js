// Import required libraries
import OpenAI from 'openai';
import { Cognitora } from '@cognitora/sdk';

// Initialize OpenAI client with API key
// WARNING: In production, use environment variables for API keys
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// Initialize Cognitora SDK client for code execution
const cognitora = new Cognitora({ 
  apiKey: process.env.COGNITORA_API_KEY,
  baseURL: 'https://api.cognitora.dev'
});

/**
 * Creates a secure code interpreter session with specified resources
 * @returns {Object} Session object and code execution tool configuration
 */
async function createCodeInterpreter() {
  // Create a new code interpreter session with Python runtime
  const session = await cognitora.codeInterpreter.createSession({
    language: 'python',           // Programming language for the interpreter
    timeout_minutes: 30,          // Maximum session duration
    resources: {
      cpu_cores: 1.0,            // Allocated CPU cores
      memory_mb: 512,            // Allocated memory in MB
      storage_gb: 5              // Allocated storage in GB
    }
  });

  // Define the tool configuration for OpenAI function calling
  // This tells GPT-4 how to format code execution requests
  const codeExecutionTool = {
    type: "function",
    function: {
      name: "execute_code",
      description: "Execute Python code in a secure sandbox",
      parameters: {
        type: "object",
        properties: {
          code: { type: "string", description: "Python code to execute" }
        },
        required: ["code"]
      }
    }
  };

  return { session, codeExecutionTool };
}

/**
 * Main function that coordinates AI code generation and execution
 * @param {string} userQuery - The user's request for code generation
 * @returns {Object} Execution results including code, output, and metadata
 */
async function runAICodeInterpreter(userQuery) {
  // Set up the code interpreter session
  const { session, codeExecutionTool } = await createCodeInterpreter();
  
  // Send the user query to OpenAI GPT-4 with code execution tool available
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { 
        role: "system", 
        content: "You are a Python expert. Write and execute code to solve problems." 
      },
      { 
        role: "user", 
        content: userQuery 
      }
    ],
    tools: [codeExecutionTool],    // Make code execution tool available
    tool_choice: "auto"            // Let GPT-4 decide when to use the tool
  });

  // Extract the tool call from GPT-4's response
  const toolCall = response.choices[0].message.tool_calls?.[0];
  
  // If GPT-4 decided to execute code, run it through Cognitora
  if (toolCall && toolCall.function.name === "execute_code") {
    // Parse the generated code from the tool call
    const { code } = JSON.parse(toolCall.function.arguments);
    
    // Execute the AI-generated code in the secure sandbox
    const execution = await cognitora.codeInterpreter.execute({
      code,                        // The Python code to execute
      language: 'python',          // Programming language
      timeout_seconds: 30          // Maximum execution time
    });
    
    // Return structured results
    return {
      code,                                    // The generated code
      result: execution.data.outputs,         // Execution output
      status: execution.data.status,          // Success/failure status
      execution_time: execution.data.execution_time_ms  // Time taken to execute
    };
  }
}

// Example usage: Ask AI to generate and execute Python code
let execution = await runAICodeInterpreter("Write a Python function to calculate the factorial of a number.");
console.log(execution);

