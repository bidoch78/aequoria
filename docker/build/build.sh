#!/bin/bash

branch="1.0"

rm -rf ./build_app
mkdir -p ./build_app

cp -r ./../../app/* ./build_app
rm -f ./build_app/*.json

docker build --force-rm -f dockerfile -t bidoch78/aequoria:${branch} .
docker tag bidoch78/aequoria:${branch} bidoch78/aequoria:latest

docker push bidoch78/aequoria:${branch}
docker push bidoch78/aequoria:latest

docker image rm bidoch78/aequoria:${branch}
docker image rm bidoch78/aequoria:latest

rm -rf ./build_app