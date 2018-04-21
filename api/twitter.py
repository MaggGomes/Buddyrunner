import urllib
from flask import session, request
from api.keys import twitter_access_token, twitter_consumer_key, twitter_consumer_secret
from flask_oauthlib.client import OAuth  # https://github.com/lepture/flask-oauthlib

flask_oauth = None
access_token = None
twitter = None


# Start Twitter OAuth
def tw_start_twitter(app):
	global flask_oauth, access_token, twitter
	flask_oauth = OAuth(app)
	access_token = twitter_access_token
	twitter = flask_oauth.remote_app(
		'twitter',
		consumer_key=twitter_consumer_key,
		consumer_secret=twitter_consumer_secret,
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


# Get Twitter authorized reply
def tw_get_authorized_reply():
	return twitter.authorized_response()


# Get Twitter OAuth Login URL
def tw_get_login_url(callback_url):
	return twitter.authorize(callback=callback_url or request.referrer or None).location


# Make request to Twitter API
def tw_make_twitter_request(endpoint, method, **params):
	url = 'https://api.twitter.com/1.1/{0}.json'.format(endpoint)
	if params:
		url = '{}?{}'.format(url, urllib.urlencode(params))
	return twitter.request(url, method=method)


# Return tweets that have #buddyrunner
def tw_filter_runs(data):
	run_list = []
	for tweet in data:
		hashtags = tweet['entities']['hashtags']
		for hashtag in hashtags:
			if 'buddyrunner' in hashtag['text']:
				run_list.append(tweet)
	return run_list


# Return tweets that weren't tweeted by a user
def tw_filter_friends(data, user_id):
	run_list = []
	for tweet in data:
		if long(tweet['user']['id']) != long(user_id):
			run_list.append(tweet)
	return run_list


# Return basic run info (id, message, creator)
def tw_get_run_basic_info(tweet):
	return {
		'id': tweet['id'],
		'text': tweet['text'],
		'creator': {
			'id': tweet['user']['id'],
			'name': tweet['user']['name'],
			'image': tweet['user']['profile_image_url']
		}
	}


# Return complete info of a run from id (basic + participants + weather + path)
def tw_get_run_complete_info(tweet):
	data = tw_get_run_basic_info(tweet)
	data['participants'] = []
	retweets = tw_make_twitter_request('statuses/retweets', 'GET', id=data['id']).data
	for tweet in retweets:
		data['participants'].append({
			'user': {
				'id': tweet['user']['id'],
				'name': tweet['user']['name'],
				'image': tweet['user']['profile_image_url']
			}
		})
	return data
