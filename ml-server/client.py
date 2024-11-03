import requests

url = 'https://greenplates-ml.onrender.com/analyse'  # Server URL
image_path = '20240923_123428.jpg'  # Replace with your image path

with open(image_path, 'rb') as img_file:
    files = {'file': img_file}
    print(img_file)
    response = requests.post(url, files=files)
    print(response)

print(response.json())
