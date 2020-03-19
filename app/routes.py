from app import app
from flask import render_template, url_for
import requests

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/_test/<float:lat>/<float:long>')
def test(lat, long):
    return requests.get(f'http://api.open-notify.org/iss-pass.json?lat={lat}&lon={long}').json()
    