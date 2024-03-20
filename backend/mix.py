from flask import Flask, jsonify, request, render_template
from flask_cors import CORS, cross_origin
from PIL import Image
import io
import tensorflow as tf
import numpy as np
import requests
import os
import joblib

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load image classification model
model = tf.keras.models.load_model('C:/Users/OM_RACHANA/OneDrive/Documents/Desktop/learnReact/farmhelp/farmhelp/backend/trained_model.h5')

# Load crop prediction model
crop_model = joblib.load('crop_app')  # Provide the correct path to your model file

# Get the API key from environment variables
API_KEY = os.getenv('API_KEY')
print("API_KEY:", os.getenv('API_KEY'))

@app.route('/')
def home():
    return render_template('Home_1.html')

@app.route('/form', methods=["POST"])
def brain():
    data = request.get_json()
    Nitrogen = float(data['Nitrogen'])
    Phosphorus = float(data['Phosphorus'])
    Potassium = float(data['Potassium'])
    Temperature = float(data['Temperature'])
    Humidity = float(data['Humidity'])
    Ph = float(data['ph'])
    Rainfall = float(data['Rainfall'])
     
    values = [Nitrogen, Phosphorus, Potassium, Temperature, Humidity, Ph, Rainfall]
    
    if 0 < Ph <= 14 and Temperature < 100 and Humidity > 0:
        arr = [values]
        acc = crop_model.predict(arr)
        return jsonify({'prediction': str(acc)})
    else:
        return jsonify({'error': "Sorry... Error in entered values in the form. Please check the values and fill it again."})

@app.route('/first')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
@cross_origin(origins='*', methods=['POST'], allow_headers=['Content-Type']) 
def predict():
    file = request.files['file']
    image_bytes = file.read()  # Read file contents as bytes
    image = Image.open(io.BytesIO(image_bytes))  # Create PIL Image object from bytes
    image = image.resize((128, 128))  # Resize image
    input_arr = tf.keras.preprocessing.image.img_to_array(image)
    input_arr = np.array([input_arr])
    prediction = model.predict(input_arr)
    result_index = np.argmax(prediction)
    class_name = ['Apple__Apple_scab', 'Apple_Black_rot', 'Apple_Cedar_apple_rust', 'Apple__healthy',
                  'Blueberry__healthy', 'Cherry(including_sour)_Powdery_mildew',
                  'Cherry_(including_sour)healthy', 'Corn(maize)_Cercospora_leaf_spot Gray_leaf_spot',
                  'Corn_(maize)Common_rust', 'Corn_(maize)Northern_Leaf_Blight', 'Corn(maize)_healthy',
                  'Grape__Black_rot', 'Grape_Esca(Black_Measles)', 'Grape__Leaf_blight(Isariopsis_Leaf_Spot)',
                  'Grape__healthy', 'Orange_Haunglongbing(Citrus_greening)', 'Peach___Bacterial_spot',
                  'Peach__healthy', 'Pepper,_bell_Bacterial_spot', 'Pepper,_bell__healthy',
                  'Potato__Early_blight', 'Potato_Late_blight', 'Potato__healthy',
                  'Raspberry__healthy', 'Soybean_healthy', 'Squash__Powdery_mildew',
                  'Strawberry__Leaf_scorch', 'Strawberry_healthy', 'Tomato__Bacterial_spot',
                  'Tomato__Early_blight', 'Tomato_Late_blight', 'Tomato__Leaf_Mold',
                  'Tomato__Septoria_leaf_spot', 'Tomato__Spider_mites Two-spotted_spider_mite',
                  'Tomato__Target_Spot', 'Tomato_Tomato_Yellow_Leaf_Curl_Virus', 'Tomato__Tomato_mosaic_virus',
                  'Tomato___healthy']
    return jsonify({"prediction": class_name[result_index]})

@app.route('/')
def get_commodity_prices():
    if API_KEY is None:
        return jsonify({'error': 'API key not found in environment variables'}), 500

    # Make a GET request to the API endpoint with the API key
    headers = {'X-API-Key': API_KEY}
    response = requests.get('https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001d607cb40f5e340215be8d911e2add5cc&format=json&offset=0&limit=1000&filters%5Bstate%5D=Maharashtra', headers=headers)

    # Check if the request was successful
    if response.status_code == 200:
        # Return the response JSON data
        return jsonify(response.json())
    else:
        # Return an error message
        return jsonify({'error': 'Failed to fetch commodity prices'}), response.status_code

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Run Flask application
