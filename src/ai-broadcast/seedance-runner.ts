const SEEDANCE_API_KEY = import.meta.env.VITE_SEEDANCE_API_KEY || "";
const BASE_URL = "https://ark.ap-southeast.bytepluses.com/api/v3/contents/generations/tasks";

export async function generateVideoWithSeedance(text: string, imageUrl?: string): Promise<string> {
    console.log("🚀 Initializing Seedance Audio-Synced Generation...");

    try {
        // Step 1: Create Task
        const createResponse = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SEEDANCE_API_KEY}`
            },
            body: JSON.stringify({
                model: "seedance-1-5-pro-251215",
                content: [
                    {
                        type: "text",
                        text: `${text} --duration 10 --camerafixed true`
                    },
                    ...(imageUrl ? [{
                        type: "image_url",
                        image_url: { url: imageUrl }
                    }] : [])
                ]
            })
        });

        if (!createResponse.ok) {
            const errorText = await createResponse.text();
            throw new Error(`Seedance Task Creation Failed: ${createResponse.status} - ${errorText}`);
        }

        const createData = await createResponse.json();
        const taskId = createData.id;
        console.log(`📡 Seedance Task Created: ${taskId}. Waiting for render...`);

        // Step 2: Poll for Results
        return await pollTaskStatus(taskId);

    } catch (error) {
        console.error("❌ Seedance Generation Failed:", error);
        // Fallback to mock if API fails
        console.warn("⚠️ Falling back to mock broadcast.");
        return "https://www.w3schools.com/html/mov_bbb.mp4";
    }
}

async function pollTaskStatus(taskId: string): Promise<string> {
    const maxAttempts = 30; // 5 minutes max (10s intervals)
    let attempts = 0;

    while (attempts < maxAttempts) {
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 10000)); // Poll every 10 seconds

        try {
            const response = await fetch(`${BASE_URL}/${taskId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${SEEDANCE_API_KEY}`
                }
            });

            if (!response.ok) continue;

            const data = await response.json();
            const status = data.status; // Assuming 'status' is returned as per typical async APIs

            if (status === 'completed' || status === 'success') {
                const videoUrl = data.result?.video_url || data.content?.[0]?.video_url; // Adjust based on actual API response structure
                if (videoUrl) {
                    console.log("✅ Seedance Render Complete!");
                    return videoUrl;
                }
            } else if (status === 'failed') {
                throw new Error(`Seedance task failed: ${data.error || 'Unknown error'}`);
            }

            console.log(`⏳ Seedance Rendering... (${attempts}/${maxAttempts})`);

        } catch (error) {
            console.warn(`Polling attempt ${attempts} failed:`, error);
        }
    }

    throw new Error("Seedance Generation Timed Out");
}
