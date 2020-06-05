#!/bin/bash

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
node -e "console.log('Running Node.js ' + process.version)"

curl -o codemirror.zip  https://codemirror.net/codemirror.zip
unzip codemirror.zip
mv codemirror-5.54.0 ~/code/public/plugins/codemirror
cd code
npm install

