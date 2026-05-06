# firewarning

## start:

```
nodemon server.js
mqtt sub -h broker.hivemq.com -t fawaz/location/updates -J 
open http://localhost:3000
```


## Send fire alarms

`mqtt pub -h broker.hivemq.com -t fawaz/location/updates -m  '{ "id": "Kuwait Towers", "lat": 29.3894, "lon": 48.0033, "status": "fire" }'`

mqtt pub -h broker.hivemq.com -t fawaz/location/updates -m 
'{
"id": "Al Hamra Tower",
"lat": 29.3781,
"lon": 47.9744,
"status": "fire"
}'

mqtt pub -h broker.hivemq.com -t fawaz/location/updates -m 
'{
"id": "Liberation Tower",
"lat": 29.3681,
"lon": 47.9751,
"status": "fire"
}'

mqtt pub -h broker.hivemq.com -t fawaz/location/updates -m
'{
"id": "Avenues Mall",
"lat": 29.3039,
"lon": 47.9351,
"status": "fire"
}'

## Cancel fire alarms

```
mqtt pub -h broker.hivemq.com -t fawaz/location/updates \
-m  '{ "id": "Avenues Mall", "lat": 29.3039, "lon": 47.9351, "status": "save" }
```

