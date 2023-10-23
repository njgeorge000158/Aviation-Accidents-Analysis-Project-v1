#!/usr/bin/env python
# coding: utf-8

# In[1]:


from flask import Flask, jsonify, request, render_template
from werkzeug.wrappers import Request, Response

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
import numpy as np

import pandas as pd

import json
import random
import sqlalchemy
import sqlite3

from datetime import datetime as dt

from flask import Flask
from flask_cors import CORS
from pathlib import Path 

from pathlib import Path 
from bs4 import BeautifulSoup


# In[2]:


pd.set_option \
    ('max_colwidth', 400)

pd.set_option \
    ('display.max_columns', 40)

pd.options \
    .mode \
    .chained_assignment \
        = None


# In[3]:


df \
    = pd.read_csv \
        ('./Resources/AviationAccidentsUpdated.csv')

df \
    = df.drop \
            (df.columns[0], 
             axis = 1)

df.head(10)


# In[4]:


connectionSQLiteObject = sqlite3.connect('Aviation_Accident.db')


# In[5]:


df.reset_index \
    (inplace=True)

df \
    = df.rename \
        (columns = {'index':'Items'})


# In[6]:


df.head()


# In[7]:


df['acc_date'] \
    = pd.to_datetime \
        (df['acc_date'], 
         format = '%Y-%m-%d')


# In[8]:


df['year'] \
    = df['acc_date'].dt.year

df['month'] \
    = df['acc_date'].dt.month

df['day'] \
    = df['acc_date'].dt.day


# In[9]:


df.head(10)


# In[10]:


df \
    = df.rename \
        (columns = {'total_fatalities':'fat'})

df \
    = df.rename \
        (columns = {'acc_date':'accident_date'})

df \
    = df.rename \
        (columns = {'accident_location':'location'})

df \
    = df.rename \
        (columns = {'acc_city':'city'})

df \
    = df.rename \
        (columns = {'acc_state':'state'})

df \
    = df.rename \
        (columns = {'county_code':'country'})

df \
    = df.rename \
        (columns = {'acc_city':'city'})

df \
    = df.rename \
        (columns = {'country_code':'country'})
    
df \
    = df.rename \
        (columns = {'acc_lat':'LAT'})

df \
    = df.rename \
        (columns = {'acc_lon':'LNG'})


# In[11]:


aviation_df \
    = df[['Items',
          'accident_date',
          'year',
          'type',
          'operator',
          'fat',
          'location',
          'country',
          'state',
          'city', 
          'LAT', 
          'LNG']]


# In[12]:


aviation_df \
    .head(10)


# In[13]:


aviation_df \
    ['operator'] \
        .value_counts()


# In[14]:


aviation_df['Items'] \
    = aviation_df['Items'] + 1


# In[15]:


aviation_df \
    = aviation_df.rename \
        (columns = {'Items':'Id_num'})


# In[16]:


aviation_df \
    .set_index \
        ('Id_num', 
         inplace = True)


# In[17]:


aviation_df \
    .to_sql \
        ('Aviation_Accident', 
         con = connectionSQLiteObject, 
         if_exists='replace', 
         index = True, 
         index_label = 'Id_num', 
         dtype = {'Id_num': 'VARCHAR PRIMARY KEY'})


# In[18]:


aviation_df \
    .info()


# In[19]:


organized_df \
    = aviation_df \
        [['accident_date',
          'year',
          'type',
          'operator',
          'fat',
          'country',
          'LAT',
          'LNG']]


# In[20]:


json_str \
    = organized_df \
        .to_json \
            (orient = 'records') 


# In[21]:


json_obj \
    = json.loads \
        (json_str)


# In[22]:


country_df \
    = aviation_df \
        [['country']]

country_df \
    .drop_duplicates \
        (keep = 'first', 
         inplace = True)

json_distinct_country_str \
    = country_df \
        .to_json \
            (orient = 'records')

json_distinct_country_obj \
    = json \
        .loads \
            (json_distinct_country_str)


# In[23]:


json_distinct_country_str \
    = country_df \
        .to_json \
            (orient = 'records')

json_distinct_country_obj \
    = json \
        .loads \
            (json_distinct_country_str)


# In[24]:


filepath \
    = Path \
        ('./Resources/Aviation_Accident.json')

filepath \
    .parent \
        .mkdir \
            (parents = True, exist_ok = True)  

aviation_df \
    .to_json \
        (filepath) 


# In[25]:


# Create engine using the `demographics.sqlite` database file
#engine =  sqlalchemy.create_engine('postgresql://postgres:Rajibmaji1#@localhost:5432/nba_db')
engine \
    = sqlalchemy \
        .create_engine \
            (f'sqlite:///Aviation_Accident.db')

# Declare a Base using `automap_base()`
Base \
    = automap_base()

# Use the Base class to reflect the database tables
Base \
    .prepare \
        (autoload_with = engine)

# Print all of the classes mapped to the Base
Base \
    .classes \
        .keys()
#nba_players = Base.classes.nba_players


# In[26]:


aviation_df \
    .columns


# In[27]:


aviation_year_df \
    = aviation_df \
        ['year'] \
            .value_counts() \
            .reset_index \
                (name = 'count')

year_json_str \
    = aviation_year_df \
        .to_json \
            (orient = 'records')

year_json_obj \
    = json \
        .loads \
            (year_json_str)


# In[28]:


aviation_json \
    = aviation_df \
        [['accident_date',
          'year',
          'type', 
          'operator', 
          'fat', 
          'location',
          'country',
          'LAT', 
          'LNG']] \
            .to_json \
                (orient = 'records')


# In[29]:


Aviation_Accident \
    = Base \
        .classes \
            .Aviation_Accident

session \
    = Session \
        (engine)


# In[30]:


app1 \
    = Flask \
        (__name__)  # create the Flask app

CORS(app1)


# In[31]:


@app1.route('/all')

def get_all_accidents():
    
    return aviation_json


# In[32]:


@app1.route('/allyear')

def get_all_accidents_year():
    
    return year_json_obj


# In[33]:


@app1.route('/alluniquecountry')

def get_all_unique_country():
    
    return json_distinct_country_obj


# In[34]:


@app1.route('/carriertypesearch')

def get_carriertype():
    
    accident_date = []
    
    year = []
    
    carrier_type = []
    
    operator = []
    
    fat = []
    
    location = []
    
    country =  []
    
    LAT = []
    
    LNG = []
    
    Aviation_Accident_carriertype \
        = { 'accident_date': [],
            'year': [],                 
            'carrier_type': [],
            'operator': [],
            'fat': [],
            'location': [],  
            'country': [], 
            'LAT': [],
            'LNG': []}

    query_location \
        = request \
            .args.get \
                ('carriertype')
    
    result \
        = session \
            .query \
                (Aviation_Accident) \
            .filter \
                (Aviation_Accident \
                    .type.contains \
                         (request.args.get \
                              ('carriertype')))
    
    for row in result:
        
        accident_date \
            .append  \
                (row.accident_date)
        
        year \
            .append \
                (row.year)
        
        carrier_type \
            .append \
                (row.type)
        
        operator \
            .append \
                (row.operator)
        
        fat \
            .append \
                (row.fat)
        
        location \
            .append \
                (row.location)
        
        country \
            .append \
                (row.country)
        
        LAT \
            .append \
                (row.LAT)
        
        LNG \
            .append \
                (row.LNG)
    
    
    Aviation_Accident_carriertype \
        ['accident_date'] \
            = accident_date
    
    Aviation_Accident_carriertype['year'] \
        = year
    
    Aviation_Accident_carriertype \
        ['carrier_type'] \
            = carrier_type
    
    Aviation_Accident_carriertype \
        ['operator'] \
            = operator
    
    Aviation_Accident_carriertype \
        ['fat'] \
            = fat
    
    Aviation_Accident_carriertype \
        ['location'] \
            = location
    
    Aviation_Accident_carriertype \
        ['country'] \
            = country
    
    Aviation_Accident_carriertype \
        ['LAT'] \
            = LAT
    
    Aviation_Accident_carriertype \
        ['LNG'] \
            = LNG
    
    df \
        = pd.DataFrame \
            (Aviation_Accident_carriertype)
    
    json_str \
        = df.to_json \
            (orient = 'records')
    
    json_obj_carrier \
        = json.loads \
            (json_str)
    
    return \
        json_obj_carrier


# In[35]:


@app1.route('/year')

def get_year():
    
    accident_date = []
    
    year = []
    
    carrier_type = []
    
    operator = []
    
    fat = []
    
    location = []
    
    country =  []
    
    LAT = []
    
    LNG = []
    
    Aviation_Accident_year \
        = {'accident_date' : [],
           'year': [],                 
           'carrier_type': [],
           'operator': [],
           'fat': [],
           'location': [],  
           'country': [], 
           'LAT': [],
           'LNG': []}

    #query_location = request.args.get("carriertype") 
    yearsearch \
        = request  \
            .args.get \
                ('year')
             
    result \
        = session \
            .query \
                (Aviation_Accident) \
            .filter \
                (Aviation_Accident.year == yearsearch)
    
    for row in result:
        
        accident_date \
            .append \
                (row.accident_date)
        
        year \
            .append \
                (row.year)
        
        carrier_type \
            .append \
                (row.type)
        
        operator \
            .append \
                (row.operator)
        
        fat \
            .append \
                (row.fat)
        
        location \
            .append \
                (row.location)
        
        country \
            .append \
                (row.country)
        
        LAT \
            .append \
                (row.LAT)
        
        LNG \
            .append \
                (row.LNG)
    

    Aviation_Accident_year \
        ['accident_date'] \
            = accident_date
    
    Aviation_Accident_year \
        ['year'] \
            = year
    
    Aviation_Accident_year \
        ['carrier_type'] \
            = carrier_type
    
    Aviation_Accident_year \
        ['operator'] \
            = operator
    
    Aviation_Accident_year \
        ['fat'] \
            = fat
    
    Aviation_Accident_year \
        ['location'] \
            = location
    
    Aviation_Accident_year \
        ['country'] \
            = country
    
    Aviation_Accident_ye1ar \
        ['LAT'] \
            = LAT
    
    Aviation_Accident_year \
        ['LNG'] \
            = LNG
    
    df \
        = pd.DataFrame \
            (Aviation_Accident_year)
    
    json_str \
        = df \
            .to_json \
                (orient = 'records')
    
    json_obj_year_accident \
        = json.loads \
            (json_str)
    
    return \
        json_obj_year_accident


# In[36]:


@app1.route('/yearsearch')

def get_yearsearch():
    
    accident_date = []
    
    year = []
    
    carrier_type = []
    
    operator = []
    
    fat = []
    
    location = []
    
    country =  []
    
    LAT = []
    
    LNG = []
    
    
    Aviation_Accident_year \
        = {'accident_date': [],
           'year': [],                 
           'carrier_type': [],
           'operator': [],
           'fat': [],
           'location': [],  
           'country' : [] , 
           'LAT': [],
           'LNG': []}

    
    #query_location = request.args.get("carriertype") 
    
    beg_year \
        = request \
            .args.get \
                ('beg')
    
    end_year \
        = request \
            .args.get \
                ('end')   
    
    result \
        = session \
            .query \
                (Aviation_Accident) \
                    .filter(Aviation_Accident.year >= beg_year) \
                    .filter(Aviation_Accident.year < end_year)
    
    for row in result:
        
        accident_date \
            .append \
                (row.accident_date)
        
        year \
            .append \
                (row.year)
        
        carrier_type \
            .append \
                (row.type)
        
        operator \
            .append \
                (row.operator)
        
        fat \
            .append \
                (row.fat)
        
        location.append \
            (row.location)
        
        country \
            .append \
                (row.country)
        
        LAT \
            .append \
                (row.LAT)
        
        LNG \
            .append \
                (row.LNG)
    
    
    Aviation_Accident_year \
        ['accident_date'] \
            = accident_date
    
    Aviation_Accident_year \
        ['year'] \
            = year
    
    Aviation_Accident_year \
        ['carrier_type'] \
            = carrier_type
    
    Aviation_Accident_year \
        ['operator'] \
            = operator
    
    Aviation_Accident_year \
        ['fat'] \
            = fat
    
    Aviation_Accident_year \
        ['location'] \
            = location
    
    Aviation_Accident_year \
        ['country'] \
            = country
    
    Aviation_Accident_year \
        ['LAT'] \
            = LAT
    
    Aviation_Accident_year \
        ['LNG'] \
            = LNG
    
    
    df \
        = pd.DataFrame \
            (Aviation_Accident_year)
    
    year_df \
        = df['year'] \
            .value_counts() \
            .reset_index \
                (name = 'count')
    
    year_df_sorted \
        = year_df \
            .sort_values('year')
    
    year_df_sorted \
        = year_df_sorted \
            .reset_index \
                (drop = True)
    
    
    json_str \
        = year_df_sorted \
            .to_json \
                (orient = 'records')
    
    json_obj_year \
        = json.loads \
            (json_str)            
    
    
    return \
        json_obj_year


# In[37]:


@app1.route('/operatorsearch')

def get_operator():
    
    accident_date = []
    
    year = []
    
    carrier_type = []
    
    operator = []
    
    fat = []
    
    location = []
    
    country = []
    
    state = []
    
    city = []
    
    LAT = []
    
    LNG = []
    
    
    Aviation_Accident_operator \
        = { 'accident_date': [],
            'year': [],              
            'carrier_type': [],
            'operator': [],
            'fat': [],
            'location': [],  
            'country': [] , 
            'LAT': [],
            'LNG': []}

    
    query_location \
        = request \
            .args.get \
                ('operator')
    
    result \
        = session \
            .query \
                (Aviation_Accident) \
            .filter \
                (Aviation_Accident \
                    .operator \
                    .contains \
                         (request \
                            .args.get('operator')))
    
    for row in result:
    
        accident_date \
            .append \
                (row.accident_date)
        
        year \
            .append \
                (row.year)
        
        carrier_type \
            .append \
                (row.type)
        
        operator \
            .append \
                (row.operator)
        
        fat \
            .append \
                (row.fat)
        
        location \
            .append \
                (row.location)
        
        country \
            .append \
                (row.country)
        
        LAT \
            .append \
                (row.LAT)
        
        LNG \
            .append \
                (row.LNG)
    
    
    Aviation_Accident_operator \
        ['accident_date'] \
            = accident_date

    Aviation_Accident_operator \
        ['year'] \
            = year
    
    Aviation_Accident_operator \
        ['carrier_type'] \
            = carrier_type
    
    Aviation_Accident_operator \
        ['operator'] \
            = operator
    
    Aviation_Accident_operator \
        ['fat'] \
            = fat
    
    Aviation_Accident_operator \
        ['location'] \
            = location
    
    Aviation_Accident_operator \
        ['country'] \
            = country
    
    Aviation_Accident_operator \
        ['LAT'] \
            = LAT
    
    Aviation_Accident_operator \
        ['LNG'] \
            = LNG
    
    
    df \
        = pd.DataFrame \
            (Aviation_Accident_operator)
    
    json_str \
        = df.to_json \
            (orient = 'records')
    
    json_obj_operator \
        = json.loads \
            (json_str)
    
    
    return \
        json_obj_operator


# In[38]:


@app1.route('/countrysearch')

def get_coutry():
    
    accident_date = []
    
    year  = []
    
    carrier_type = []
    
    operator = []
    
    fat = []
    
    location = []
    
    country =  []
    
    LAT = []
    
    LNG = []
    
    
    Aviation_Accident_country \
        = {'accident_date': [],
           'year': [],             
           'carrier_type': [],
           'operator': [],
           'fat': [],
           'location': [],  
           'country': [] , 
           'LAT': [],
           'LNG': []}

    
    query_location \
        = request \
            .args.get \
                ('country') 
    
    result \
        = session \
            .query \
                (Aviation_Accident) \
            .filter \
                (Aviation_Accident \
                    .country \
                    .contains \
                         (request \
                              .args.get \
                                  ('country')))
    
    
    for row in result:
        
        accident_date \
            .append \
                (row.accident_date)
        
        year \
            .append \
                (row.year)
        
        carrier_type \
            .append \
                (row.type)
        
        operator \
            .append \
                (row.operator)
        
        fat \
            .append \
                (row.fat)
        
        location \
            .append \
                (row.location)
        
        country \
            .append \
                (row.country)
        
        LAT \
            .append \
                (row.LAT)
        
        LNG \
            .append \
                (row.LNG)
    
    
    Aviation_Accident_country \
        ['accident_date'] \
            = accident_date
    
    Aviation_Accident_country \
        ['year'] \
            = year
    
    Aviation_Accident_country \
        ['carrier_type'] \
            = carrier_type
    
    Aviation_Accident_country \
        ['operator'] \
            = operator
    
    Aviation_Accident_country \
        ['fat'] \
            = fat
    
    Aviation_Accident_country \
        ['location'] \
            = location
    
    Aviation_Accident_country \
        ['country'] \
            = country
    
    Aviation_Accident_country \
        ['LAT'] \
            = LAT
    
    Aviation_Accident_country \
        ['LNG'] \
            = LNG
    
    
    df \
        = pd.DataFrame \
            (Aviation_Accident_country)
    
    json_str \
        = df.to_json \
            (orient = 'records')
    
    json_obj_country \
        = json.loads \
            (json_str)
    
    return \
        json_obj_country   


# In[39]:


@app1.route('/')

def home():
    
    return \
        render_template \
            ('index.html')


#         routes = ['http://127.0.0.1:9000/all',
#                 'http://127.0.0.1:9000/random',
#                 'http://127.0.0.1:9000/search?name="Player partial name"']
#         return (routes)


# In[ ]:


if __name__ == '__main__':
    
    from werkzeug.serving import run_simple
    
    run_simple \
        ('localhost', 
         8000, 
         app1)


# In[ ]:




