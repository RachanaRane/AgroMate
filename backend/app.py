# app.py
# app.py
from flask import Flask, jsonify, request
import requests
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# Get the API key from environment variables
API_KEY = os.getenv('API_KEY')
print("API_KEY:", os.getenv('API_KEY'))


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
    
    app.run(debug=True,port=5000)