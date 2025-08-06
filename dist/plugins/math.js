import { evaluate } from 'mathjs';
export async function runMathPlugin(message) {
    try {
        const expression = message.match(/(\d+[\d\s+\-*/().]*)/g)?.[0] || '';
        // Use mathjs instead of eval for security
        const result = evaluate(expression);
        return `The result of ${expression} is ${result}`;
    }
    catch (error) {
        return 'Invalid math expression.';
    }
}
