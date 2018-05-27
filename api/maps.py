import googlemaps

from api.keys import google_maps_key


def geo_locate(location):
    gmaps = googlemaps.Client(key=google_maps_key)
    geocode_result = gmaps.geocode(location)[0]['geometry']['location']
    return geocode_result
