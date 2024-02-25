## Configuration
There are two parts to this solution: the client (**meter-ui**) and the server (**meter-api**).

The client runs at:

    http://localhost:3000

The server is listening on port 5000:

    http://localhost:5000

## Run
To start both the client (meter-ui) and the server (meter-api), just run:

    make

## API requests for meter-api

Status:

    curl http://localhost:5000/api/



Electricity and CO2 consumption:

    curl 'http://localhost:5000/api/meters/6514167223e3d1424bf82742?start-date=2023-1-1&end-date=2023-1-2&api-key=3VV8eB8qlHMYoUFjp2QQiw'
