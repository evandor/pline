rm -rf node_modules/ .tmp/ plugins/ platforms/ www/

mkdir www

npm install
ionic platform add ios

ionic plugin add cordova-plugin-x-socialsharing

cordova plugin add ionic-plugin-deeplinks --variable URL_SCHEME=pline --variable DEEPLINK_SCHEME=https --variable DEEPLINK_HOST=pline.one

ionic build

