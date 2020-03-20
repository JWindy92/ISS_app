from app import app
from flask import render_template, url_for, flash
from app.forms import PassTimeField
import requests

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/_pass_times/<string:lat>/<string:lon>')
def pass_times(lat, lon):       
    try:
        lat = float(lat)
        lon = float(lon)
    except ValueError:
        print("[ERROR] Values must be float or integer type")
    return requests.get(f'http://api.open-notify.org/iss-pass.json?lat={lat}&lon={lon}').json()
    
@app.route('/_get_astronauts')
def get_astronauts():
    # return "ASTROS"
    return requests.get('http://api.open-notify.org/astros.json').json()