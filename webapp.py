from flask import Flask, jsonify, render_template
import os

app = Flask(__name__, static_folder='static')


#pagina de loguin do meu site, por consequencia a index
@app.route('/')
def index():
    return render_template('/index.html')

#pagina de controle de estoque do meu site
@app.route('/controle-de-estoque')
def control_page():
    return render_template('/controle-de-estoque.html')


#pagina de acesso master
@app.route('/acess-master')
def private_acess():
    return render_template('/acess-master.html')


#pagina de inserção de equipamentos
@app.route('/insert-device')
def add_device():
    return render_template('insert-db.html')
        



#pagina 404
@app.errorhandler(404)
def pagina_nao_encontrada(e):
    return render_template('404.html'), 404


if __name__=='__main__':
    app.run(debug=True, host='0.0.0.0',port=int(os.environ.get('port',8080)))

  
