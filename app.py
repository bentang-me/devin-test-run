from fastapi import FastAPI

app = FastAPI()

@app.get('/handle-call')
def handle_call():
    return "call handled"

@app.get('/generate-joke')
def generate_joke():
    return "joke generated"

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=5000)
