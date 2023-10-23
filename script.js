// Replace 'YOUR_THINGSPEAK_CHANNEL_ID' and 'YOUR_API_KEY' with your actual ThingSpeak values.
const channelID = '2308799';
const apiKey = 'Y5D386LU3W5X66Y2';
const apiUrl = `https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${apiKey}&results=1`;

async function fetchData() {
    try {
        const response = await fetch(apiUrl);

        if (response.status === 200) {
            const data = await response.json();

            if (data.feeds.length > 0) {
                const feed = data.feeds[0];
                const temperatureValue = parseFloat(feed.field1);
                const humidityValue = parseFloat(feed.field2);

                if (!isNaN(temperatureValue)) {
                    document.getElementById('temperature').textContent = temperatureValue.toFixed(2);
                } else {
                    document.getElementById('temperature').textContent = 'N/A';
                }

                if (!isNaN(humidityValue)) {
                    document.getElementById('humidity').textContent = humidityValue.toFixed(2);
                } else {
                    document.getElementById('humidity').textContent = 'N/A';
                }
            } else {
                console.error('No data available in ThingSpeak channel.');
            }
        } else {
            console.error('Failed to retrieve data from ThingSpeak. Status:', response.status);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();




