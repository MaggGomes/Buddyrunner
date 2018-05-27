from pymongo import MongoClient

client = MongoClient('mongodb://buddyrunner_adm:lapd2018@ds237620.mlab.com:37620/buddyrunner')
db = client.buddyrunner
runs = db.runs


def db_insert_run(run):
	runs.insert_one(run)


def db_get_run_by_id(run_id):
	return runs.find_one({'id': run_id})


def db_get_runs_by_user(user_id):
	return runs.find({'participants.id': user_id})



