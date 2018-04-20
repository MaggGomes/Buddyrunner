# coding: utf-8

from api.twitter import *
from flask import Flask
from flask import g, session, request, url_for, json, Response

app = Flask(__name__)
app.debug = True
app.secret_key = 'development'
tw_start_twitter(app)


@app.before_request
def before_request():
	g.user = None
	if 'twitter_oauth' in session:
		g.user = session['twitter_oauth']


@app.route('/')
def index():
	return 'Buddyrunner API'


@app.route('/login')
def login():
	callback_url = url_for('oauthorized', next=request.args.get('next'))
	return Response(json.dumps({'url': tw_get_login_url(callback_url)}), status=200, mimetype='application/json')


@app.route('/oauthorized')
def oauthorized():
	resp = tw_get_authorized_reply()
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
	user_name = session['twitter_oauth']['screen_name']
	data = tw_make_twitter_request('statuses/user_timeline', 'GET', screen_name=user_name).data
	return json.dumps([
		tw_get_run_basic_info(t)
		for t
		in tw_filter_runs(data)])


@app.route('/friends')
def friends():
	user_name = session['twitter_oauth']['screen_name']
	data = tw_make_twitter_request('statuses/home_timeline', 'GET', screen_name=user_name).data
	return json.dumps([
		tw_get_run_basic_info(t)
		for t
		in tw_filter_friends(tw_filter_runs(data), session['twitter_oauth']['user_id'])])


@app.route('/runs/<tweet_id>')
def run(tweet_id):
	data = tw_make_twitter_request('statuses/show', 'GET', id=tweet_id).data
	return json.dumps([
		tw_get_run_complete_info(t)
		for t
		in tw_filter_runs([data])])


if __name__ == '__main__':
	app.run()
