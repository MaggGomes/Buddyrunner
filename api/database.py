from pymongo import MongoClient

client = MongoClient('mongodb://buddyrunner_adm:lapd2018@ds237620.mlab.com:37620/buddyrunner')
db = client.buddyrunner
runs = db.runs

