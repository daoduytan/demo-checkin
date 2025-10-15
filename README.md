This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
bun dev
```

## Docker

### Build and run
```bash
docker-compose up --build
```

### Run at background
```bash
docker-compose up -d
```

### Re-Build
```bash
docker compose up --build -d
```

## Run MQTT Broker in local
### Install Mosquitto
- Linux: sudo apt install mosquitto
- MacOS:  brew install mosquitto

## Configure MQTT Broker
### MacOS: 
- open -a TextEdit /opt/homebrew/etc/mosquitto/mosquitto.conf

### Linux:
- vi ~/.config/mosquitto/mosquitto.conf

## Run MQTT Broker

### MacOS:
- Run: brew services restart mosquitto
- Stop: brew services stop mosquitto

### Linux
- Run: mosquitto -c ~/.config/mosquitto/mosquitto.conf -v
- Stop: sudo systemctl stop mosquitto

### Test:
- Sub: mosquitto_sub -h 198.168.1.86 -p 1883 -t '/topic/detected/V21441M504'
- Send: mosquitto_pub -h 192.168.1.86 -p 1883 -t '/topic/detected/V21441M504' -m 'Hello World'



