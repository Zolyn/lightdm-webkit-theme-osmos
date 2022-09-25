# npm run build
sudo chmod 777 -R dist
rm -Rf /usr/share/web-greeter/themes/osmos/*
cp -r ./dist/* /usr/share/web-greeter/themes/osmos