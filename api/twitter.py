import re
import urllib
import time
from api.maps import *
from api.weather import *
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
    print(url)
    return twitter.request(url, method=method)


# Return tweets that have #buddyrunner
def tw_filter_runs(data):
    run_list = []
    for tweet in data:
        hashtags = tweet['entities']['hashtags']
        for hashtag in hashtags:
            if 'buddyrunner' in hashtag['text']:
                run_list.append(tweet)
    sorted_runs = sorted(run_list, key=lambda x: re.search('[\d]+[-/][\d]+[-/][\d]+', x['text']))
    return sorted_runs


# Return tweets that weren't tweeted by a user
def tw_filter_friends(data, user_id):
    run_list = []
    for tweet in data:
        if str(tweet['user']['id']) != str(user_id):
            run_list.append(tweet)
    sorted_runs = sorted(run_list, key=lambda x: re.search('[\d]+[-/][\d]+[-/][\d]+', x['text']))
    return sorted_runs


# Return run info
def tw_get_run_info(tweet, **kwargs):
    if 'retweeted_status' in tweet:
        tweet = tweet['retweeted_status']

    run_info = {
        'id': str(tweet['id']),
        'creator': {
            'id': str(tweet['user']['id']),
            'name': tweet['user']['name'],
            'image': tweet['user']['profile_image_url']
        }
    }
    run_info.update(tw_get_run_body_info(tweet['text']))
    if kwargs.get('participants'):
        run_info.update(tw_get_run_participants(str(tweet['id']), str(tweet['user']['id'])))
    return run_info


# Processes and return the info on the tweet body
def tw_get_run_body_info(text):
    data = {}
    lines = text.split('\n')
    for line in lines:
        try:
            line = re.sub('#[^ ]*', '', line)  # remove hashtags
            line = line.split(': ')  # split key/values
            line[1] = line[1].strip()  # trim whitespace from values
            if ('Date' or 'date') in line[0]:
                data['date'] = re.search('[\d]+[-/][\d]+[-/][\d]+', line[1]).group(0) + ' ' + re.search(
                    '[\d]+:[\d]+', line[1]).group(0)
            elif ('Location' or 'location') in line[0]:
                data['location'] = line[1]
                data['lat'] = geo_locate(line[1])['lat']
                data['lng'] = geo_locate(line[1])['lng']
            elif ('Distance' or 'distance') in line[0]:
                data['distance'] = {
                    'value': re.search('[\d]+', line[1]).group(0),
                    'unit': re.search('[\D]+', line[1]).group(0)
                }
            elif ('Duration' or 'duration') in line[0]:
                data['duration'] = line[1]
        except (IndexError, AttributeError):
            continue

    if data != {} and 'date' in data and 'location' in data:
        data['weather'] = get_weather(data['lat'], data['lng'],
                                      time.mktime(time.strptime(data['date'], "%d/%m/%Y %H:%M")))
    return data


# Returns participants of a race
def tw_get_run_participants(tweet_id, creator_id):
    data = {'participants': []}
    retweets = tw_make_twitter_request('statuses/retweets', 'GET', id=tweet_id).data
    for tweet in retweets:
        if str(tweet['user']['id']) != str(creator_id):
            data['participants'].append({
                'user': {
                    'id': str(tweet['user']['id']),
                    'name': tweet['user']['name'],
                    'image': tweet['user']['profile_image_url']
                }
            })
    return data
