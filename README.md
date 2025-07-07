# AI Code Interpreter Demo

This project demonstrates how to use the Cognitora SDK to create an AI-powered code interpreter that can generate and execute Python code safely in a sandboxed environment.

## Overview

The demo combines:
- **OpenAI GPT-4** for intelligent code generation
- **Cognitora SDK** for secure code execution in isolated sandboxes
- **Function calling** to seamlessly integrate AI reasoning with code execution

## Features

- 🤖 AI-powered code generation using GPT-4
- 🔒 Secure code execution in isolated sandboxes
- ⚡ Real-time code execution with results
- 📊 Execution metrics (time, status, output)
- 🐍 Python runtime environment

## Prerequisites

- Node.js 18+ (required for ES modules)
- OpenAI API key
- Cognitora API key

## Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Setup

### API Keys

You'll need to obtain API keys for both services:

1. **OpenAI API Key**: Get from [OpenAI Platform](https://platform.openai.com/api-keys)
2. **Cognitora API Key**: Get from [Cognitora Dashboard](https://cognitora.dev)

### Environment Variables (Recommended)

For security, create a `.env` file in the project root:

```env
OPENAI_API_KEY=your_openai_api_key_here
COGNITORA_API_KEY=your_cognitora_api_key_here
```

Then update the code to use environment variables:

```javascript
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const cognitora = new Cognitora({ 
  apiKey: process.env.COGNITORA_API_KEY,
  baseURL: 'https://api.cognitora.dev'
});
```

## Usage

### Basic Usage

Run the demo with:

```bash
node index.js
```

The example will ask AI to generate a factorial function and execute it.

### Custom Queries

Modify the query in `index.js`:

```javascript
let execution = await runAICodeInterpreter("Your custom request here");
```

### Example Queries

- "Write a Python function to calculate the Fibonacci sequence"
- "Create a data visualization of sample sales data"
- "Implement a simple linear regression model"
- "Generate a random password with specific criteria"

## How It Works

1. **Query Processing**: User query is sent to GPT-4 with code execution capabilities
2. **Code Generation**: GPT-4 generates Python code to solve the problem
3. **Secure Execution**: Generated code runs in Cognitora's isolated sandbox
4. **Results**: Output, status, and execution metrics are returned

## Code Structure

```
├── index.js          # Main application file
├── package.json      # Project dependencies and configuration
└── README.md         # This file
```

### Key Functions

- `createCodeInterpreter()`: Sets up the sandboxed execution environment
- `runAICodeInterpreter()`: Coordinates AI generation and code execution

## Security Features

- **Sandboxed Execution**: Code runs in isolated containers
- **Resource Limits**: CPU, memory, and storage constraints
- **Timeout Protection**: Automatic termination of long-running code
- **No Network Access**: Isolated from external networks

## Resource Configuration

The sandbox is configured with:
- 1 CPU core
- 512 MB memory
- 5 GB storage
- 30-minute session timeout
- 30-second execution timeout

## Error Handling

The demo includes basic error handling for:
- API connection failures
- Code execution errors
- Timeout scenarios
- Invalid responses

## Limitations

- Python runtime only (other languages available via Cognitora)
- No persistent storage between executions
- Limited to text-based outputs
- API rate limits apply

## Security Considerations

⚠️ **Important**: Never commit API keys to version control. Use environment variables or secure key management systems in production.

## Dependencies

- `@cognitora/sdk`: ^1.0.6 - Cognitora SDK for code execution
- `openai`: ^5.8.2 - OpenAI SDK for GPT-4 integration

## API Documentation

- [Cognitora SDK Documentation](https://www.cognitora.dev/docs/getting-started/getting-started)
- [OpenAI API Documentation](https://platform.openai.com/docs)

## License

This project is licensed under the ISC License.

## Support

For issues with:
- **Cognitora SDK**: Visit [Cognitora Support](https://cognitora.dev/support)
- **OpenAI API**: Check [OpenAI Help Center](https://help.openai.com)
- **This Demo**: Create an issue in this repository

## Contributing

Feel free to submit issues and enhancement requests! 