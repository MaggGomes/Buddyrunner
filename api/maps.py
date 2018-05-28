import googlemaps

from api.keys import google_maps_key


def geo_locate(location):
    gmaps = googlemaps.Client(key=google_maps_key)
    geocode_result = gmaps.geocode(location)[0]['geometry']['location']
    return geocode_result


def maps_get_location(coordinates):
    gmaps = googlemaps.Client(key=google_maps_key)
    geocode_result = gmaps.reverse_geocode((coordinates['latitude'], coordinates['longitude']))
    return geocode_result
    

def maps_get_path(waypoints):
    gmaps = googlemaps.Client(key=google_maps_key)
    directions_results = gmaps.directions(
        origin=waypoints[0],
        destination=waypoints[len(waypoints)-1],
        waypoints=waypoints[1:len(waypoints) - 1],
        mode='walking'
    )
    return directions_results

    
def decode_polyline(polyline_str):
    index, lat, lng = 0, 0, 0
    coordinates = []
    changes = {'latitude': 0, 'longitude': 0}
    while index < len(polyline_str):
        for unit in ['latitude', 'longitude']: 
            shift, result = 0, 0

            while True:
                byte = ord(polyline_str[index]) - 63
                index+=1
                result |= (byte & 0x1f) << shift
                shift += 5
                if not byte >= 0x20:
                    break

            if (result & 1):
                changes[unit] = ~(result >> 1)
            else:
                changes[unit] = (result >> 1)

        lat += changes['latitude']
        lng += changes['longitude']

        coordinates.append((lat / 100000.0, lng / 100000.0))

    return coordinates