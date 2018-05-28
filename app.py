# coding: utf-8

from api.twitter import *
from api.weather import *
from api.database import *
from api.maps import *
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


@app.route('/auth', methods=['POST'])
def auth():
    data = json.loads(request.data)
    session['twitter_oauth'] = {}

    session['twitter_oauth']['oauth_token'] = data['token']
    session['twitter_oauth']['oauth_token_secret'] = data['secret']
    session['twitter_oauth']['user_id'] = data['id']
    session['twitter_oauth']['screen_name'] = data['user_name']

    print(session['twitter_oauth'])
    data = tw_make_twitter_request('users/show', 'GET', user_id=data['id']).data

    return Response(
        json.dumps({'name': data['name'], 'image_url': data['profile_image_url']}),
        status=200,
        mimetype='application/json')


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
        print (resp)
    return Response(status=200)


@app.route('/logout')
def logout():
    session.pop('twitter_oauth', None)
    return Response(status=200)


@app.route('/runs')
def runs():
    if request.method == 'GET':
        rts = request.args['rts'] if 'rts' in request.args else True
        user_name = session['twitter_oauth']['screen_name']
        data = tw_make_twitter_request('statuses/user_timeline', 'GET', screen_name=user_name, include_rts=rts).data
        return json.dumps([
            tw_get_run_info(t)
            for t
            in tw_filter_runs(data)])


@app.route('/runs/create', methods=['POST'])
def create():
    req = json.loads(request.data)
    tweet = ''
    if req.get('date'):
        tweet += 'Date: {0}\n'.format(req.get('date'))
    if req.get('location'):
        tweet += 'Location: {0}\n'.format(req.get('location'))
    if req.get('distance'):
        tweet += 'Distance: {0}\n'.format(req.get('distance'))
    if req.get('duration'):
        tweet += 'Duration: {0}\n'.format(req.get('duration'))
    tweet += '#buddyrunner'
    resp = tw_make_twitter_request('statuses/update', 'POST', status=tweet).data
    db_insert_run({
        "id": resp["id"]
    })
    return json.dumps(resp)


@app.route('/runs/friends')
def friends():
    user_name = session['twitter_oauth']['screen_name']
    data = tw_make_twitter_request('statuses/home_timeline', 'GET', screen_name=user_name).data
    return json.dumps([
        tw_get_run_info(t)
        for t
        in tw_filter_friends(tw_filter_runs(data), session['twitter_oauth']['user_id'])])


@app.route('/runs/<tweet_id>')
def run(tweet_id):
    data = tw_make_twitter_request('statuses/show', 'GET', id=tweet_id).data
    run_info = [
        tw_get_run_info(t, participants=True)
        for t
        in tw_filter_runs([data])][0]
    return json.dumps(run_info)


@app.route('/runs/<tweet_id>/join')
def join(tweet_id):
    data = tw_make_twitter_request('statuses/retweet', 'POST', id=tweet_id).data
    return json.dumps(data)


@app.route('/runs/nearby')
def nearby():
    return


@app.route('/get_path')
def get_path():
	print(request.args)
    return json.dumps(maps_get_path(json.loads(request.data)))


if __name__ == '__main__':
    app.run()
