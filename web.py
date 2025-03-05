from flask import Flask, render_template

app = Flask(name)

@app.route('/')
def home():
    return "<h1>สวัสดี! นี่คือเว็บของคุณ</h1>"

if name == 'main':
    app.run(debug=True)