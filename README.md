# Bute Health - Personalized AQI-Based Health Alert System

![Bute Health Screenshot](./screenshot.png) *(Note: Add screenshot after testing)*

## Overview
Bute Health is a web application that provides personalized health recommendations based on your location's air quality index (AQI) and your individual health profile.

## Features
- 📍 **Real-time location detection** with city/town name display
- 🌡️ **AQI and weather dashboard** with color-coded air quality levels
- 🩺 **Personalized health profile** capturing:
  - Age, gender, and pre-existing conditions
  - Lifestyle factors (smoking, activity levels)
  - Environmental factors (ventilation, air purifiers)
- 💡 **Intelligent recommendations** tailored to your health profile and current AQI
- 📱 **Responsive design** that works on all devices

## Technologies Used
- Frontend: HTML5, CSS3 (Tailwind CSS), JavaScript
- Icons: Font Awesome
- Typography: Google Fonts (Inter)
- Location Services: OpenStreetMap Nominatim API

## Setup Instructions
1. Clone this repository
2. Open the project directory
3. Start the development server:
   ```bash
   python3 -m http.server 8000
   ```
4. Open your browser and visit: `http://localhost:8000`

## Usage
1. Fill out your health profile in the form
2. Allow location access when prompted
3. View your personalized dashboard showing:
   - Current location and AQI
   - Weather conditions
   - Health recommendations

## Customization
To modify the application:
- Edit `index.html` for structural changes
- Modify `script.js` for functionality changes
- Update Tailwind classes in both files for styling changes

## Future Enhancements
- Integrate with real AQI data APIs
- Add historical air quality trends
- Implement user accounts to save profiles
- Add push notifications for poor air quality alerts

## License
This project is open source and available under the MIT License.

---

*Note: For a real deployment, you would need to:*
1. *Host the files on a web server*
2. *Potentially set up a backend service for AQI data*
3. *Configure proper CORS headers for API access*
