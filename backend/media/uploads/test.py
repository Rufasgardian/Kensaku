from flask import Flask, request, render_template_string
import sqlite3
import hashlib

app = Flask(__name__)

# OWASP A1: Injection
@app.route('/search')
def search():
    query = request.args.get('query')
    conn = sqlite3.connect('example.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE name = '%s'" % query)
    results = cursor.fetchall()
    conn.close()
    return str(results)

# OWASP A2: Broken Authentication
users = {
    'admin': 'password123',  # Hardcoded password
}

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    if users.get(username) == password:
        return "Logged in as %s" % username
    else:
        return "Login failed"

# OWASP A3: Sensitive Data Exposure
@app.route('/user/<username>')
def get_user(username):
    conn = sqlite3.connect('example.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE name = '%s'" % username)
    user = cursor.fetchone()
    conn.close()
    return str(user)  # Exposes all user data

# OWASP A5: Broken Access Control
@app.route('/admin')
def admin():
    if request.args.get('role') == 'admin':
        return "Welcome admin!"
    else:
        return "Access denied"

# OWASP A6: Security Misconfiguration
@app.route('/debug')
def debug():
    return render_template_string("Debug info: {{debug_info}}", debug_info=request.args.get('debug_info'))

# OWASP A7: Cross-Site Scripting (XSS)
@app.route('/greet')
def greet():
    name = request.args.get('name')
    return "Hello, %s!" % name  # No escaping

# OWASP A8: Insecure Deserialization
import pickle

@app.route('/deserialize')
def deserialize():
    data = request.args.get('data')
    obj = pickle.loads(data)
    return str(obj)

# OWASP A9: Using Components with Known Vulnerabilities
@app.route('/hash')
def hash_password():
    password = request.args.get('password')
    return hashlib.md5(password.encode()).hexdigest()  # MD5 is outdated

# OWASP A10: Insufficient Logging & Monitoring
@app.route('/transfer')
def transfer():
    amount = request.args.get('amount')
    to_account = request.args.get('to_account')
    # No logging of transfer details
    return "Transferred %s to %s" % (amount, to_account)

if __name__ == '__main__':
    app.run(debug=True)
