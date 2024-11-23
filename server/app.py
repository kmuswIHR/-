from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import random
from PIL import Image
from io import BytesIO
import base64

app = Flask(__name__)

# CORS 설정: React의 주소인 localhost:3000에서 오는 요청을 허용
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# 이미지 저장 폴더
IMAGE_FOLDER = 'generated_images'
if not os.path.exists(IMAGE_FOLDER):
    os.makedirs(IMAGE_FOLDER)

# 예시: /api/process_input 경로로 사용자 텍스트를 받아 이미지 생성
@app.route('/api/process_input', methods=['POST'])
def process_input():
    data = request.get_json()
    text = data.get('text')

    # 간단한 텍스트 기반 이미지 생성 예시 (이미지 처리 로직은 여기에서 구현)
    image = Image.new('RGB', (200, 200), color = (73, 109, 137))
    # 예시로 텍스트를 이미지에 그리기 (텍스트 처리 추가 가능)
    image_path = os.path.join(IMAGE_FOLDER, f'{random.randint(1, 10000)}.png')
    image.save(image_path)

    # 이미지 URL 반환
    image_url = f'http://localhost:5000/{image_path}'
    return jsonify({"image_url": image_url})

# 한 달 동안 받은 이미지들 보기
@app.route('/api/all_images', methods=['GET'])
def get_all_images():
    # 디렉토리 내의 모든 이미지 파일 목록 반환
    images = [f'/{IMAGE_FOLDER}/{img}' for img in os.listdir(IMAGE_FOLDER) if img.endswith('.png')]
    return jsonify({"images": images})

# 기본 경로로 요청이 오면 간단한 메시지 반환
@app.route('/')
def home():
    return jsonify({"message": "Welcome to Flask Backend!"})

if __name__ == '__main__':
    app.run(debug=True)
