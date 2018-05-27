from api.keys import weather_key
import urllib2
import math
import json


def get_weather(lat, lon, time):
	lat = lat
	lon = lon
	time = time

	url = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=metric&appid={key}'.format(
		lat=lat, lon=lon, key=weather_key)
	resp = urllib2.urlopen(url).read()
	for timestamp in json.loads(resp)['list']:
		if math.fabs(timestamp['dt'] - time) <= 5400:  # find closest time (half of the 3 hour interval)
			return {
				'temperature': timestamp['main']['temp'],
				'weather': timestamp['weather'][0]['description']
			}
	return {}
