from app import app
from flask import render_template, url_for
import requests

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/_test')
def test():
    return requests.get('http://api.open-notify.org/iss-pass.json?lat=34&lon=34').json()
    