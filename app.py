from flask import Flask

app = Flask(__name__)

@app.route('/handle-call')
def handle_call():
    return "call handled"

@app.route('/generate-joke')
def generate_joke():
    return "joke generated"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
