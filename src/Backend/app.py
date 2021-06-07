from flask import Flask

app = Flask(__name__)


@app.route("/")
def index():
    return "Hello LASSCoin"

@app.route("/api/transactions/create", methods=["POST"])
def create_transaction(**kwargs):
    return kwargs

if __name__ == "__main__":
    app.run(debug=True, port=5000, host="0.0.0.0")
