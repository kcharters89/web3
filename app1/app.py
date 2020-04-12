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
        d = list(r)
        for data in d:
            print(data)
    return render_template('index.html')
   
#add new countries in the routes so it doenst run every time the index is run 

@app.route('/inspiration')
def inspiration():
    return render_template('inspiration.html')

#@app.route('/loadData')
#def utility():
    #this loads the data to database
    # nz = Country(name="New Zealand").save()
    # aus = Country(name="Australia").save()
    # fra = Country(name="France").save()
    # germ = Country(name="Germany").save()
    # names = []
    
    
    # for c in Country.objects:
        
    #     names.append(c.name) 
    # #how to stop duplicates
    # #json will turn it into a string 
    # #return Country.objects.to_json() built into mongoengine
    # return json.dumps(names)
    #json.dumps(names) #python one 

#api's (seperate file?)
#@app.route('/countries', methods=['GET'])
@app.route('/countries', methods=['GET','POST','DELETE'])
def getCountries(countries_id=None):
    if request.method == 'GET':
        #getting data from the database
        #countries = utility()
        
        if countries_id is None:
             countries = Country.objects
        else:
             countries = Country.objects.get(name=countries_id)
        name = countries
        #print them to html      
        return  render_template('countries.html', countries=countries, name=name)
         
    if request.method == 'POST':
        #updating data in database
        countries = Country.objects
        name=request.form['name']
        new = Country(name=name).save()
        return render_template('countries.html',countries=countries, name=name)

    #if request.method == 'DELETE':
       # """delete country with ID <countries_id>"""
    else:
    # POST Error 405 Method Not Allowed
        return render_template('countries.html')
if __name__ == "__main__":
    app.run(debug=True, port=8080)
    #app.run(host='0.0.0.0', port=80)
    


	