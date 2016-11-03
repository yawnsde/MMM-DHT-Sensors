# MMM-DHT-Sensors
This an extension for the [MagicMirror](https://github.com/MichMich/MagicMirror).

The intention is to access DHT11/DHT22 sensors directly within MM without any cronjobs and submitted data via textfiles or stdout/stdin. Both temperature and humidity are displayed onscreen. 

## Requirements

The  [BCM2835](http://www.airspayce.com/mikem/bcm2835/) library is required on your raspberry pi.

[node-dht-sensor](https://github.com/momenso/node-dht-sensor) is required as well.

## Installation

Open a terminal session on your raspberry pi. No matter if you are using ssh or if you access your pi directly.

First of all you need to install the BCM2835 library, in case you don't have it. Just follow the instructions below or look at the libraries website to find the most recent version and updated installation instructions.
```bash
# download the sources
wget http://www.airspayce.com/mikem/bcm2835/bcm2835-1.50.tar.gz
# extract the archive
tar zxvf bcm2835-1.50.tar.gz
cd bcm2835-1.50
# compile and install the library
./configure
make
sudo make check
sudo make install
```

Afterwards we can install the MagicMirror Module. Navigate to your MagicMirror's modules folder using `cd ~/MagicMirror/modules` and execute `git clone https://github.com/yawnsde/MMM-DHT-Sensors.git`, a new folder called MMM-DHT-Sensors will be created. Change into the new folder with `cd MMM-DHT-Sensors` and run `npm install` to install dependencies.
Now please change into the subfolder using `cd node_modules/node-dht-sensor` and run the command below:
```bash
npm rebuild --runtime=electron --target=1.3.4 --disturl=https://atom.io/download/atom-shell --abi=49
```
This was done to avoid any version errors.

Last step before we can use the module is to add our user to the GPIO security group.
```bash
sudo adduser -g $USER gpio
```
## Usage

WORK IN PROGRESS!
