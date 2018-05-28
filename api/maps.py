import googlemaps

from api.keys import google_maps_key


def geo_locate(location):
    gmaps = googlemaps.Client(key=google_maps_key)
    geocode_result = gmaps.geocode(location)[0]['geometry']['location']
    return geocode_result


def maps_get_path(waypoints):
    gmaps = googlemaps.Client(key=google_maps_key)
    directions_results = gmaps.directions(
        origin=waypoints[0],
        destination=waypoints[len(waypoints)-1],
        waypoints=waypoints[1:len(waypoints) - 1],
        mode='walking'
    )
    print(directions_results)
    return directions_results
