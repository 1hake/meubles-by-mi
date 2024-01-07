#!/bin/bash

# Build the React website
yarn run build

# Connect to the OVH server using FTP
mv build/* etch/
scp -r -p etch root@gobc.fr:/var/www/