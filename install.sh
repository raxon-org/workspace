#!/bin/sh
docker-compose up -d --build
docker exec -it raxon-workspace-0-0-1 /bin/bash
