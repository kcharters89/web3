from flask import Flask, render_template, request
from mongoengine import *

import json
import os
import csv
import jinja2

connect('web3')


app = Flask(__name__)
#before the routes , later on will go in a seperate file for structure
app.config.from_object('config')

#models?
class Country(Document):
    name = StringField()
    
@app.route('/')
@app.route('/index')
@app.route('/home')
def index():
    #choose csv that doeesnt have missing data or figure how turn blanks into 0's
    for file in os.listdir(app.config['FILES_FOLDER']):
        filename = os.fsdecode(file)
        path = os.path.join(app.config['FILES_FOLDER'],filename)
        f = open(path)
        r = csv.reader(f)
        #d = list(r)
        for row in r:
           for i, x in enumerate(row):
                if len(x)< 1:
                    x = row[i] = 0
    print (','.join(str(x) for x in row))
    #works for only zimbabwae by turning blank into 0 need it for all countries 
    #ask about this maybe
    return render_template('index.html')
   
#add new countries in the routes so it doenst run every time the index is run 

@app.route('/inspiration')
def inspiration():
    return render_template('inspiration.html')

@app.route('/loadData')
def utility():
    #this loads the data to database
    nz = Country(name="New Zealand").save()
    aus = Country(name="Australia").save()
    fra = Country(name="France").save()
    germ = Country(name="Germany").save()
    names = []
    
    
    for c in Country.objects:
        if c.name not in Country.objects:
            names.append(c.name) 
        else:
            names.insert(0)    
    # how to stop duplicates this keeps adding the same list to itself 
    # #json will turn it into a string 
    # #return Country.objects.to_json() built into mongoengine
    return json.dumps(names)
    #json.dumps(names) #python one 

#api's (seperate file?)
@app.route('/countries<countries_id>', methods=['GET'])
def getCountriesById(countries_id=None):
    countries = None
    if countries_id is None:
        countries = Country.objects
    else:
        countries = Country.objects.get(name=countries_id)
    return countries.to_json()

@app.route('/countries', methods=['GET','POST','DELETE'])
def getCountries(countries_id=None):
    if request.method == 'GET':
        name=request.form.get('name') 
        if countries_id is None:
            countries = Country.objects
             
        else:
            countries = Country.objects.get(name=name)
            
        
        # render_template('countries.html', countries=countries)
         
    elif request.method == 'POST':
        #updating data in database
        
        name=request.form.get('name')
        
        newName = Country(name=name).save()
        
        countries = Country.objects
        
        #render_template('countries.html',countries=countries, name=name)

    elif request.method == 'DELETE':
         
        name = request.form.get('name') 
        delname = Country.objects(name=name).all()
        delname.delete()
        countries = Country.objects
        
    else:
    # POST Error 405 Method Not Allowed
        return render_template('countries.html')
    return render_template('countries.html',countries=countries, name=name)
if __name__ == "__main__":
    app.run(debug=True, port=8080)
    #app.run(host='0.0.0.0', port=80)
    


	