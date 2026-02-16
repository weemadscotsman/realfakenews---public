/**
 * Test script for AI client
 * Run with: npx ts-node netlify/functions/lib/test-ai.ts
 */

import { getAIClient, getAIInfo } from './ai-client';

async function testAI() {
    console.log('🧪 Testing AI Client...\n');
    
    const info = getAIInfo();
    console.log('AI Info:', info);
    
    const client = getAIClient();
    
    if (!client) {
        console.error('❌ No AI client available');
        console.log('\nEnvironment variables:');
        console.log('  OPENROUTER_API_KEY:', process.env.OPENROUTER_API_KEY ? '✅ Set' : '❌ Not set');
        console.log('  GOOGLE_API_KEY:', process.env.GOOGLE_API_KEY ? '✅ Set' : '❌ Not set');
        process.exit(1);
    }
    
    console.log(`✅ AI client initialized (${info.provider})\n`);
    
    try {
        console.log('📝 Testing satire generation...');
        const result = await client.generateContent({
            contents: [{
                role: 'user',
                parts: [{ text: 'Write a funny satirical headline about AI taking over the world. Keep it short and absurd.' }]
            }],
            generationConfig: { temperature: 0.9 }
        });
        
        console.log('✅ Success!');
        console.log('Generated text:', result.response.text().slice(0, 200));
        
    } catch (error) {
        console.error('❌ Generation failed:', error);
        process.exit(1);
    }
}

// Run test
testAI().then(() => {
    console.log('\n✨ All tests passed!');
    process.exit(0);
}).catch(err => {
    console.error('\n💥 Test failed:', err);
    process.exit(1);
});
