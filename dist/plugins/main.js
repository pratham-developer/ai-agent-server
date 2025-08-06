import { runWeatherPlugin } from '../plugins/weather.js';
import { runMathPlugin } from '../plugins/math.js';
export async function runPlugins(message) {
    const lowerMessage = message.toLowerCase();
    // Weather detection - more comprehensive
    const weatherKeywords = ['weather', 'temperature', 'forecast', 'climate', 'rain', 'sunny', 'cloudy'];
    const hasWeatherIntent = weatherKeywords.some(keyword => lowerMessage.includes(keyword));
    // Math detection - improved pattern
    const mathPattern = /(?:\d+(?:\.\d+)?)\s*[+\-*/]\s*(?:\d+(?:\.\d+)?)|calculate|compute|what is \d+/;
    const hasMathIntent = mathPattern.test(lowerMessage);
    if (hasWeatherIntent) {
        return await runWeatherPlugin(message);
    }
    if (hasMathIntent) {
        return await runMathPlugin(message);
    }
    return null;
}
