import streamlit as st
import tensorflow as tf 
import numpy as np

#Tensor Model Prediction
def def_model_prediction(test_image):
    model=tf.keras.models.load_model('trained_model.h5')
    image = tf.keras.preprocessing.image.load_img(test_image,target_size=(128,128))
    input_arr = tf.keras.preprocessing.image.img_to_array(image)
    input_arr=np.array([input_arr])
    prediction=model.predict(input_arr)
    result_index=np.argmax(prediction)
    return result_index

#sIDEBAR
st.sidebar.title("Dashboard")
app_mode = st.sidebar.selectbox("Select Page",["Home","About","Disease Recognition"])

#Main Page
if(app_mode=="Home"):
    st.header("PLANT DISEASE RECOGNITION SYSTEM")
    image_path = "home_page.jpeg.jpg"
    st.image(image_path,use_column_width=True)
    st.markdown("""
    Welcome to the Plant Disease Recognition System! 🌿🔍
    
    Our mission is to help in identifying plant diseases efficiently. Upload an image of a plant, and our system will analyze it to detect any signs of diseases. Together, let's protect our crops and ensure a healthier harvest!

    ### How It Works
    1. Upload Image: Go to the Disease Recognition page and upload an image of a plant with suspected diseases.
    2. Analysis: Our system will process the image using advanced algorithms to identify potential diseases.
    3. Results: View the results and recommendations for further action.

    ### Why Choose Us?
    - Accuracy: Our system utilizes state-of-the-art machine learning techniques for accurate disease detection.
    - User-Friendly: Simple and intuitive interface for seamless user experience.
    - Fast and Efficient: Receive results in seconds, allowing for quick decision-making.

    ### Get Started
    Click on the Disease Recognition page in the sidebar to upload an image and experience the power of our Plant Disease Recognition System!

    ### About Us
    Learn more about the project, our team, and our goals on the About page.
    """)

#About Project
elif(app_mode=="About"):
    st.header("About")
    st.markdown("""
                #### About Dataset
                This dataset is recreated using offline augmentation from the original dataset.The original dataset can be found on this github repo.
                This dataset consists of about 87K rgb images of healthy and diseased crop leaves which is categorized into 38 different classes.The total dataset is divided into 80/20 ratio of training and validation set preserving the directory structure.
                A new directory containing 33 test images is created later for prediction purpose.
                #### Content
                1. train (70295 images)
                2. test (33 images)
                3. validation (17572 images)

                """)

#Prediction Page
elif(app_mode=="Disease Recognition"):
    st.header("Disease Recognition")
    test_image = st.file_uploader("Choose an Image:")
    if(st.button("Show Image")):
        st.image(test_image,width=4,use_column_width=True)
    #Predict button
    if(st.button("Predict")):
        st.snow()
        st.write("Our Prediction")
        result_index = def_model_prediction(test_image)
        #Reading Labels
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
        st.success("Model is Predicting it's a {}".format(class_name[result_index]))