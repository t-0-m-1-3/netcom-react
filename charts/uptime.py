from flask import Flask, escape, request, url_for
from datetime import timedelta

app = Flask(__name__)

@app.route('/')
def index():
    return f"Navigate to /uptime for the system's uptime"
@app.route('/uptime')
def uptime():
    with open('/proc/uptime', 'r') as f:
        uptime_seconds = float(f.readline().split()[0])
        uptime_string = str(timedelta(seconds = uptime_seconds))

    return f'The System Uptime is {escape(uptime_string)}'
