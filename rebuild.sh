rm -rf node_modules/ .tmp/ plugins/ platforms/ www/

mkdir www

npm install
ionic platform add ios
ionic build

