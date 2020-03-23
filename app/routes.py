from app import app
from flask import render_template, url_for, flash
import requests

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/current')
def current():
    return render_template('current.html')

@app.route('/pass_times')
def pass_times():
    return render_template('pass_times.html')

@app.route('/astros')
def astros():
    return render_template('astros.html')

@app.route('/_get_pass_times/<string:lat>/<string:lon>')
def get_pass_times(lat, lon):       
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