// AQI Health Alert System - Main Script

// DOM Elements
const healthForm = document.getElementById('healthForm');
const dashboard = document.getElementById('dashboard');

// AQI Categories and Health Implications
const aqiCategories = {
    good: { range: [0, 50], color: 'bg-green-500', text: 'Good', description: 'Air quality is satisfactory, and air pollution poses little or no risk.' },
    moderate: { range: [51, 100], color: 'bg-yellow-500', text: 'Moderate', description: 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.' },
    sensitive: { range: [101, 150], color: 'bg-orange-500', text: 'Unhealthy for Sensitive Groups', description: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.' },
    unhealthy: { range: [151, 200], color: 'bg-red-500', text: 'Unhealthy', description: 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.' },
    veryUnhealthy: { range: [201, 300], color: 'bg-purple-500', text: 'Very Unhealthy', description: 'Health alert: The risk of health effects is increased for everyone.' },
    hazardous: { range: [301, 500], color: 'bg-maroon-500', text: 'Hazardous', description: 'Health warning of emergency conditions: everyone is more likely to be affected.' }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Try to get user's location automatically
    getLocation();
});

// Form submission handler
healthForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(healthForm);
    const userProfile = Object.fromEntries(formData.entries());
    
    // Process the form data and generate advice
    processUserProfile(userProfile);
});

// Get user's location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                fetchAQIData(latitude, longitude);
            },
            error => {
                console.error("Error getting location:", error);
                // Default to a major city if location access is denied
                fetchAQIData(40.7128, -74.0060); // New York coordinates
            }
        );
    } else {
        console.log("Geolocation is not supported by this browser.");
        fetchAQIData(40.7128, -74.0060); // Fallback to New York
    }
}

// Fetch AQI data from OpenAQ API (mock implementation)
async function fetchAQIData(lat, lng) {
    // In a real implementation, we would call an actual AQI API
    // For this demo, we'll use mock data
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock AQI data
    const mockAQI = Math.floor(Math.random() * 300); // Random AQI between 0-300
    const mockLocation = "Your Location";
    const mockWeather = {
        temp: Math.floor(Math.random() * 30) + 10, // 10-40°C
        humidity: Math.floor(Math.random() * 60) + 30, // 30-90%
        wind: (Math.random() * 10).toFixed(1) // 0-10 km/h
    };
    
    updateDashboard(mockAQI, mockLocation, mockWeather);
}

// Update the dashboard with AQI and weather data
function updateDashboard(aqi, location, weather) {
    const category = getAQICategory(aqi);
    
    dashboard.innerHTML = `
        <div class="bg-white rounded-lg shadow p-4">
            <div class="flex justify-between items-center mb-2">
                <h3 class="text-lg font-semibold">Current Location</h3>
                <span class="text-sm text-gray-500"><i class="fas fa-map-marker-alt mr-1"></i> ${location}</span>
            </div>
            
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h3 class="text-2xl font-bold">AQI: ${aqi}</h3>
                    <span class="px-2 py-1 rounded text-white ${category.color}">${category.text}</span>
                </div>
                <div class="text-right">
                    <p class="text-sm"><i class="fas fa-temperature-high mr-1"></i> ${weather.temp}°C</p>
                    <p class="text-sm"><i class="fas fa-tint mr-1"></i> ${weather.humidity}% Humidity</p>
                    <p class="text-sm"><i class="fas fa-wind mr-1"></i> ${weather.wind} km/h Wind</p>
                </div>
            </div>
            
            <div class="bg-gray-100 p-3 rounded">
                <p class="text-sm">${category.description}</p>
            </div>
        </div>
        
        <div id="adviceSection" class="bg-white rounded-lg shadow p-4">
            <h3 class="text-lg font-semibold mb-2">Personalized Health Advice</h3>
            <p class="text-gray-500">Complete your health profile to see personalized recommendations</p>
        </div>
    `;
}

// Get AQI category based on value
function getAQICategory(aqi) {
    for (const [key, value] of Object.entries(aqiCategories)) {
        if (aqi >= value.range[0] && aqi <= value.range[1]) {
            return value;
        }
    }
    return aqiCategories.hazardous; // Default to hazardous if above 500
}

// Process user profile and generate advice
function processUserProfile(profile) {
    // Get current AQI (in a real app, this would come from the API)
    const aqiElement = document.querySelector('#dashboard h3.text-2xl');
    const currentAQI = aqiElement ? parseInt(aqiElement.textContent.split(': ')[1]) : 100;
    const category = getAQICategory(currentAQI);
    
    // Generate advice based on user profile and AQI
    const advice = generateAdvice(profile, currentAQI);
    
    // Update the advice section
    const adviceSection = document.getElementById('adviceSection');
    if (adviceSection) {
        adviceSection.innerHTML = `
            <h3 class="text-lg font-semibold mb-2">Personalized Health Advice</h3>
            <div class="space-y-3">
                ${advice.map(item => `
                    <div class="flex items-start">
                        <div class="flex-shrink-0 mt-1 mr-2 text-${item.important ? 'red' : 'blue'}-500">
                            <i class="fas fa-${item.important ? 'exclamation-triangle' : 'info-circle'}"></i>
                        </div>
                        <div>
                            <p class="text-sm ${item.important ? 'font-medium text-gray-800' : 'text-gray-600'}">${item.text}</p>
                            ${item.details ? `<p class="text-xs text-gray-500 mt-1">${item.details}</p>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

// Generate personalized advice based on user profile and AQI
function generateAdvice(profile, aqi) {
    const advice = [];
    const conditions = profile.conditions || [];
    const category = getAQICategory(aqi);
    
    // General advice based on AQI level
    if (aqi > 150) {
        advice.push({
            text: "Limit outdoor activities",
            details: "The air quality is poor. Consider reducing time spent outdoors.",
            important: true
        });
    }
    
    if (aqi > 100 && profile.outdoor_exercise === 'daily') {
        advice.push({
            text: "Reschedule outdoor exercise",
            details: "Consider moving your exercise indoors or to times when air quality is better.",
            important: true
        });
    }
    
    // Advice for sensitive groups
    if (conditions.includes('asthma') || conditions.includes('copd')) {
        if (aqi > 50) {
            advice.push({
                text: "Use your rescue inhaler as needed",
                details: "Air quality may trigger respiratory symptoms. Keep your medication handy.",
                important: true
            });
        }
        if (aqi > 100) {
            advice.push({
                text: "Consider wearing a mask outdoors",
                details: "An N95 mask can help filter out harmful particles.",
                important: true
            });
        }
    }
    
    if (conditions.includes('heart')) {
        if (aqi > 100) {
            advice.push({
                text: "Monitor for heart symptoms",
                details: "Poor air quality can strain your cardiovascular system. Watch for unusual fatigue, chest discomfort, or shortness of breath.",
                important: true
            });
        }
    }
    
    // Home environment advice
    if (profile.ventilation === 'always_open' && aqi > 100) {
        advice.push({
            text: "Adjust your window opening habits",
            details: "Consider keeping windows closed during peak pollution hours.",
            important: false
        });
    }
    
    if (profile.air_purifier === 'no' && aqi > 100) {
        advice.push({
            text: "Consider using an air purifier",
            details: "An air purifier with HEPA filter can improve indoor air quality.",
            important: false
        });
    }
    
    if (profile.commute === 'walk' || profile.commute === 'bike') {
        if (aqi > 100) {
            advice.push({
                text: "Consider alternative commute options",
                details: "On high pollution days, public transport may expose you to fewer pollutants than walking or cycling.",
                important: true
            });
        } else {
            advice.push({
                text: "Your active commute is beneficial",
                details: "Walking or cycling is great for your health when air quality is good!",
                important: false
            });
        }
    }
    
    // Smoking advice
    if (profile.smoking === 'current' && aqi > 50) {
        advice.push({
            text: "Consider reducing smoking",
            details: "The combination of smoking and air pollution significantly increases health risks.",
            important: true
        });
    }
    
    // If no specific advice was generated, provide general tips
    if (advice.length === 0) {
        advice.push({
            text: "Air quality is good for your profile",
            details: "No special precautions needed at this time.",
            important: false
        });
    }
    
    return advice;
}
