from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from PIL import Image
import io
import tensorflow as tf
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load model
model = tf.keras.models.load_model('trained_model.h5')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['file']
    image_bytes = file.read()  # Read file contents as bytes
    image = Image.open(io.BytesIO(image_bytes))  # Create PIL Image object from bytes
    image = image.resize((128, 128))  # Resize image
    input_arr = tf.keras.preprocessing.image.img_to_array(image)
    input_arr = np.array([input_arr])
    prediction = model.predict(input_arr)
    result_index = np.argmax(prediction)
    class_name = ['Apple_Apple_scab', 'Apple_Black_rot', 'Apple_Cedar_apple_rust', 'Apple_healthy',
                  'Blueberry__healthy', 'Cherry(including_sour)_Powdery_mildew',
                  'Cherry_(including_sour)healthy', 'Corn(maize)_Cercospora_leaf_spot Gray_leaf_spot',
                  'Corn_(maize)Common_rust', 'Corn_(maize)Northern_Leaf_Blight', 'Corn(maize)_healthy',
                  'Grape_Black_rot', 'Grape_Esca(Black_Measles)', 'Grape_Leaf_blight(Isariopsis_Leaf_Spot)',
                  'Grape_healthy', 'Orange_Haunglongbing(Citrus_greening)', 'Peach__Bacterial_spot',
                  'Peach_healthy', 'Pepper,_bell_Bacterial_spot', 'Pepper,_bell_healthy',
                  'Potato_Early_blight', 'Potato_Late_blight', 'Potato_healthy',
                  'Raspberry_healthy', 'Soybean_healthy', 'Squash_Powdery_mildew',
                  'Strawberry_Leaf_scorch', 'Strawberry_healthy', 'Tomato_Bacterial_spot',
                  'Tomato_Early_blight', 'Tomato_Late_blight', 'Tomato_Leaf_Mold',
                  'Tomato_Septoria_leaf_spot', 'Tomato_Spider_mites Two-spotted_spider_mite',
                  'Tomato_Target_Spot', 'Tomato_Tomato_Yellow_Leaf_Curl_Virus', 'Tomato_Tomato_mosaic_virus',
                  'Tomato___healthy']
    return jsonify({"prediction": class_name[result_index]})

if __name__ == '__main__':
    app.run(debug=True,port=5001)