#!/bin/sh
docker-compose up -d --build
docker exec -it docker-12.7-core /bin/bash
