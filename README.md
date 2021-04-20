# meteor-messenger
A simple CRUD app made with Meteor and React Native

To get it running:
```bash


git clone https://github.com/JonahGroendal/meteor-messenger.git
cd meteor-messenger/meteor-project
npm install
npm run start
# then navigate to localhost:3000 in your browser to see the web app

# to get the android app running, open a new terminal window and
cd meteor-messenger/RNProject
npm install
# start up your android emulator, then
npm run start
#then navigate to the same directory in another terminal window and run
npm run android
```

To deploy:
```bash
# First, build.
# This step must be done on an x86 machine with meteor installed
./build.sh

# Then extract and start containers.
# Can be done on an ARM machine, without meteor
./extract.sh
docker-compose up -d
```
