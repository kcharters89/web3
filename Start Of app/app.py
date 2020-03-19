from flask import Flask, render_template, request
from mongoengine import *
import json

connect('web3')

app = Flask(__name__)
#before the routes , later on will go in a seperate file for structure
app.config.from_object('config')


class Country(Document):
    name = StringField()

@app.route('/')
@app.route('/index')
@app.route('/home')
def index():
  
    return render_template('index.html')
   
#add new countries in the routes so it doenst run every time the app is run 
#for some reason wont save to db ?? 
@app.route('/inspiration')
def inspiration():
    return render_template('inspiration.html')

@app.route('/loadData')
def utility():
    nz = Country(name="New Zealand").save()
    aus = Country(name="Australia").save()
    fra = Country(name="France").save()
    germ = Country(name="Germany").save()
    names = []
    for c in Country.objects:
       names.append(c.name)
       
    #json will turn it into a string 
    #return Country.objects.to_json() built into mongoengine
    return json.dumps(names) 
    #json.dumps(names) #python one 

#api's (seperate file?)
@app.route('/countries', methods=['GET'])
@app.route('/countries/<countries_id>', methods=['GET'])
def getCountries(countries_id=None):
    countries = None
    #figure out what to do with the countries id idk im struggling
    if countries_id is None:
        countries = Country.objects
    else:
        countries = Country.objects.get(name=countries_id)
    return countries.to_json()
     
if __name__ =="__main__":
    app.run(debug=True, port=8080)
    #app.run(host='0.0.0.0', port=80) for when on server
    # how to put on the vritual machnee ?


	