from flask import Flask, request, jsonify
from keras.models import load_model  # TensorFlow is required for Keras to work
from PIL import Image, ImageOps  # Install pillow instead of PIL
import numpy as np
from keras.layers import DepthwiseConv2D

from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)

np.set_printoptions(suppress=True)

# Load # Define a custom layer without the 'groups' argument if it's safe to do so
class CustomDepthwiseConv2D(DepthwiseConv2D):
    def __init__(self, *args, **kwargs):
        kwargs.pop('groups', None)  # Remove groups argument
        super().__init__(*args, **kwargs)

# Load the model with the custom layer
model = load_model('keras_model.h5', custom_objects={'DepthwiseConv2D': CustomDepthwiseConv2D})


with open("labels.txt", "r") as f:
    class_names = f.readlines()
    class_names = [str(i[2:]).strip() for i in class_names]
    print(class_names)



# Define the image input shape
data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)

@app.route('/analyse', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    
    try:
        image = Image.open(file).convert("RGB")  # Read file content into memory

        # Resizing the image to 224x224
        size = (224, 224)
        image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)

        # Turn the image into a numpy array and normalize it
        image_array = np.asarray(image)
        normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1

        # Load the image into the array
        data[0] = normalized_image_array

        # Predict using the model
        prediction = model.predict(data)
        index = np.argmax(prediction)
        class_name = class_names[index].strip()  # Remove newline characters
        confidence_score = prediction[0][index]

        global bonus_score
        bonus_score = 150

        if class_name == 'foodwaste-max':
            bonus_score = confidence_score * -350
        elif class_name == 'foodwaste-min':
            bonus_score = confidence_score * 350
        elif class_name == 'foodwaste-nil':
            bonus_score = confidence_score * 485

        print(
            f'prediction: {prediction}\n index: {index}\n class: {class_name}\n confidence score: {confidence_score}\n bonus: {bonus_score}\n'
        )

        # Create response with prediction details
        response = {
            "foodwaste_level": class_name,
            "rewards": bonus_score, 
            "confidence_score": float(confidence_score),
            "message": "200 OK"
        }

        print(response)
        
        return jsonify(response), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
