from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, login_required, logout_user
from .models import User
from . import db
import jwt as pyjwt
from datetime import datetime, timedelta

auth = Blueprint('auth', __name__)

SECRET_KEY = '5624a198809cd986e35e2b880c97d58d'

@auth.route('/login', methods=['POST'])
def login():
    print('log in page loaded')
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'message': 'Username and password are required!'}), 400
    
    user = User.query.filter_by(username=username).first()
    
    if not user:
        return jsonify({'message': 'User not found!'}), 404

    if check_password_hash(user.password, password):
        # User authenticated. Let's generate the token.
        token_payload = {
            'user_id': user.id,
            'exp': datetime.utcnow() + timedelta(hours=24)  # Token expiration set to 24 hours. Adjust as needed.
        }
        print(token_payload)
        token = pyjwt.encode(token_payload, SECRET_KEY, algorithm="HS256")
        print("Generated token:", token)
        return jsonify({'token': token}), 200
    else:
        return jsonify({'message': 'Incorrect password!'}), 401

@auth.route('/signup', methods=['POST'])
def signup_post():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user:
        return jsonify({"message": "Username already exists."}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password)

    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully."})

@auth.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out successfully."})
