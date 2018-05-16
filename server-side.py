from flask import Flask,render_template,url_for,redirect,request,jsonify
app = Flask(__name__)

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Home, HomeSpec, HomeNextTo

engine = create_engine('sqlite:///homespec.db')
Base.metadata.bind =  engine
DBSession = sessionmaker(bind = engine)
session = DBSession()

#main page

@app.route('/')
@app.route('/home')
def homeList():
    home = 
