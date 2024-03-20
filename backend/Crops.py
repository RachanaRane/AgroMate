import joblib
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS  

app = Flask(__name__)
CORS(app)  # Enable CORS for your Flask app

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
        model = joblib.load('crop_app')  # Provide the correct path to your model file
        arr = [values]
        acc = model.predict(arr)
        return jsonify({'prediction': str(acc)})
    else:
        return jsonify({'error': "Sorry... Error in entered values in the form. Please check the values and fill it again."})

if __name__ == '__main__':
    app.run(debug=True,port=5002)