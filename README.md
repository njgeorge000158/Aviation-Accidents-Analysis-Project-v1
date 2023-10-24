# Project 3 - Team 3 <br>
## Flight Mishap Maps: Exploring Aviation Accidents Worldwide <br>

Project 3 Repository for the UPenn Data Science Bootcamp. Team members: Jackie Ochuida, Nicholas George, Rajib Maji, Arame Diasse, Theresa Bravo, Vishnu Pillai, Stephen Grantham. 
## Project Overview<brs>
Our objective was to extract and clean 50 years of aviation crash data in order to compare historical trends and create maps of aviation accident with user-friendly interactivities allowing viewers to uncover patterns, trends, and insights.

We employed D3, JSON, Javascript, Plotly, Leaflet, SQLite, Flask, Jupyter Notebook, and JQuery. Our final visualizations are presented on a landing page made with HTML.<br>

It has 3 Parts : 
Data Extraction and Data cleansing : 


Data Load and Flask API : 
Aviation_Accident_Database_Flask.ipynb - This Program takes the CSV created from previous Step and load it to Database ( SQLLite). 
It also create couple of Flask APIs which we had used in Data Visualization Section

Data Visualization : 
Landing_Page_V2 - This is our landing Page 
It has 3 different Visualization Links 
1 . Heat Map Plane Crash Location : indexHeatmap.html 
2. Accident Count per Year : index_plotly.html , logic_plotly.js ( We have Year Filter )
3. Major Accident Maps in last 50 Year : index.html , logic.js ( In this module we had used jquery library to show Text Box Event / Filter). 

