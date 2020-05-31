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
    data = DictField()
    
@app.route('/')
@app.route('/index')
@app.route('/home')
def index():
    #put in load data
    #choose csv that doeesnt have missing data or figure how turn blanks into 0's
    
        #this below will turn blank into 0  need to incorperate into above code?
        # for row in d:
        #     for i, x in enumerate(row):
        #         if len(x)< 1:
        #                  x = row[i] = 0
        #     print (','.join(str(x)for x in row))  
            
          
        
        
    return render_template('index.html'), 200
   
#add new countries in the routes so it doenst run every time the index is run 

@app.route('/inspiration')
def inspiration():
    return render_template('inspiration.html')

@app.route('/loadData')
def utility():
    for file in os.listdir(app.config['FILES_FOLDER']):
        filename = os.fsdecode(file)
        path = os.path.join(app.config['FILES_FOLDER'],filename)
        f = open(path)
        r = csv.DictReader(f) 
        d = list(r)
        for data in d:
            country = Country() # a blank placeholder country
            dict = {} # a blank placeholder data dict
            for key in data: # iterate through the header keys
                if key == "country":
                    # check if this country already exists in the db
                    countryName = data[key]
                    # if the country does not exist, we can use the new blank country we created above, and set the name
                    #check database with Countrys.objects thats what this is 
                    if Country.objects(name = countryName).count() == 0:
                        country['name'] = countryName
                        country.save()
                    else:    
                    # if the country already exists, replace the blank country with the existing country from the db, and replace the blank dict with the current country's 
                    # data  
                        country = Country.objects.get(name=countryName)
                        dict = country['data']
                else:
                    f = filename.replace(".csv","") # we want to trim off the ".csv" as we can't save anything with a "." as a mongodb field name
                    if f in dict: # check if this filename is already a field in the dict
                        dict[f][key] = data[key] # if it is, just add a new subfield which is key : data[key] (value)
                    else:
                        dict[f] = {key:data[key]} # if it is not, create a new object and assign it to the dict

                # add the data dict to the country
                country['data'] = dict
            # save the country
            country.save()
    return Country.objects.to_json()
    #json.dumps(names) #python one 
@app.route('/apidoc')
def apiDoc():
      return render_template('apidoc.html')
#api's (seperate file?)
@app.route('/countries/<countries_id>', methods=['GET'])
@app.route('/countries', methods=['GET','POST','DELETE'])
def getCountries(countries_id=None):
    if request.method == 'GET':

        name=request.form.get('name') 

        if countries_id is None: # if no country given
            countries = Country.objects #return all
            if name: #if name enetered
                 countries = Country.objects.get(name=name) #return objects with that name
            else:
                countries = Country.objects #othrwise return all
        else:
            countries = Country.objects(name=countries_id).all()   #if non of the above return all     
        
        
         
    elif request.method == 'POST':
        #updating data in database
        #on postman can add empty data and thats it
        name=request.form.get('name')
        if name:
            newName = Country(name=name).save()
        
        countries = Country.objects
        
       
        #delete doesnt work anymore
    elif request.method == 'DELETE':
         
        name = request.form.get('name') 
        #gets one
        delname = Country.objects.get(name=name)
        delname.delete()
        countries = Country.objects
        
        
       
    return countries.to_json()
    #for countries data 
@app.route('/countrypage')
def countryPage():
    countries = Country.objects
    return render_template('countries.html',countries=countries)


if __name__ == "__main__":
    app.run(debug=True, port=8080)
    #app.run(host='0.0.0.0', port=80)
    


	