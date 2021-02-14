# Buschemi

## Introduction
Buschemi generates random color schemes

## Installation
```
npm install buschemi
```

## Usage
```
import buschemi from 'buschemi';

n = 3
scheme = buschemi.scheme(n)
```

for specific ranges of saturation and lumosity
```
n = 3
sRange = [12, 40]
lRange = [50, 50]
scheme = buschemi.rangedScheme(n, sRange, lRange)
```
