# coding: utf-8

import keys
import urllib
from flask import Flask
from flask import g, session, request, url_for, json, Response
from flask_oauthlib.client import OAuth  # https://github.com/lepture/flask-oauthlib

app = Flask(__name__)
app.debug = True
app.secret_key = 'development'

oauth = OAuth(app)

access_token = keys.access_token
twitter = oauth.remote_app(
	'twitter',
	consumer_key=keys.consumer_key,
	consumer_secret=keys.consumer_secret,
	base_url='https://api.twitter.com/1.1/',
	request_token_url='https://api.twitter.com/oauth/request_token',
	access_token_url='https://api.twitter.com/oauth/access_token',
	authorize_url='https://api.twitter.com/oauth/authorize'
)


@twitter.tokengetter
def get_twitter_token():
	if 'twitter_oauth' in session:
		resp = session['twitter_oauth']
		return resp['oauth_token'], resp['oauth_token_secret']


@app.before_request
def before_request():
	g.user = None
	if 'twitter_oauth' in session:
		g.user = session['twitter_oauth']


def make_twitter_request(endpoint, method, **params):
	url = 'https://api.twitter.com/1.1/{0}.json'.format(endpoint)
	if params:
		url = '{}?{}'.format(url, urllib.urlencode(params))
	return twitter.request(url, method=method)


def filter_runs(data):
	run_list = []
	for tweet in data:
		hashtags = tweet['entities']['hashtags']
		for hashtag in hashtags:
			if 'buddyrunner' in hashtag['text']:
				run_list.append(tweet)
	return run_list


def filter_friends(data, user_id):
	run_list = []
	for tweet in data:
		if long(tweet['user']['id']) != long(user_id):
			run_list.append(tweet)
	return run_list


def get_run_basic_info(tweet):
	return {
		'id': tweet['id'],
		'text': tweet['text'],
		'user_id': tweet['user']['id'],
		'user_name': tweet['user']['name'],
		'user_image': tweet['user']['profile_image_url']
	}


@app.route('/')
def index():
	return 'Buddyrunner API'


@app.route('/login')
def login():
	callback_url = url_for('oauthorized', next=request.args.get('next'))
	url = twitter.authorize(callback=callback_url or request.referrer or None)
	return Response(json.dumps({'url': url.location}), status=200, mimetype='application/json')


@app.route('/oauthorized')
def oauthorized():
	resp = twitter.authorized_response()
	if resp is None:
		return Response(json.dumps({'message': 'User failed to login'}), status=200, mimetype='application/json')
	else:
		session['twitter_oauth'] = resp
	return Response(status=200)


@app.route('/logout')
def logout():
	session.pop('twitter_oauth', None)
	return Response(status=200)


@app.route('/runs')
def runs():
	data = make_twitter_request(
		'statuses/user_timeline',
		'GET',
		screen_name=session['twitter_oauth']['screen_name']).data
	return json.dumps([
		get_run_basic_info(t)
		for t
		in filter_runs(data)])


@app.route('/friends')
def friends():
	data = make_twitter_request(
		'statuses/home_timeline',
		'GET',
		screen_name=session['twitter_oauth']['screen_name']).data
	return json.dumps([
		get_run_basic_info(t)
		for t
		in filter_friends(filter_runs(data), session['twitter_oauth']['user_id'])])


@app.route('/runs/<tweet_id>')
def run(tweet_id):
	data = make_twitter_request(
		'statuses/show',
		'GET',
		id=tweet_id).data
	return json.dumps([
		get_run_basic_info(t)
		for t
		in filter_runs([data])])


if __name__ == '__main__':
	app.run()
