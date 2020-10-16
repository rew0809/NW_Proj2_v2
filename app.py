import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///CovidCases.sqlite")
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

Base.classes.keys()

# Save reference to the table
Covid = Base.classes.CovidCases

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################
# create route that renders index.html template
@app.route("/")
def home():
    # return render_template("index.html")


    session = Session(engine)
    # Query all passengers
    results = session.query(Covid.Date, Covid.DailyCases, Covid.vix, Covid.sp, Covid.xal ).all()
    session.close()
    covid_data = []
    for date, dailyCases, vix, sp, xal  in results:
        covid_dict = {}
        covid_dict["date"] = date
        covid_dict["dailyCases"] = dailyCases
        covid_dict["vix"] = vix
        covid_dict["sp"] = sp
        covid_dict["xal"] = xal
        covid_data.append(covid_dict)
    return jsonify(covid_data)

if __name__ == "__main__":
    app.run()