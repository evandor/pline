rm -rf node_modules/ .tmp/ plugins/ platforms/ www/

mkdir www

npm install
ionic build
ionic platform add ios
