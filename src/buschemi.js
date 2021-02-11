const getNumbers = (count) => {
    return [...Array(count).keys()];
}

const generateRandomHexBit = () => {
    const random = Math.random();
    return ((random * 16) | 0).toString(16);
}

const getRandomColor = () => {
    return getNumbers(6).reduce((hex, index) => {
        return hex += generateRandomHexBit();
    }, '#');
}

const chunkArray = (input) => { return input.split('')
    //this is a little fucky with the result array mutation, need to change that to make sure it's pure functional
    //could go for a little condensing as well
    .reduce((resultArray, item, index) => { 
        chunkIndex = Math.floor(index/2)
        resultArray[chunkIndex] = resultArray[chunkIndex] || []
        resultArray[chunkIndex].push(item)
        return resultArray
    }, [])
};

const hexToRGB = (hex) => {
    return chunkArray(hex.slice(1)).map((item) => parseInt(item.join(''), 16))
}

const scaleRGB = (rgb) => {
    return rgb.map(item => item/255)
}

const rgbToHue = (inputRBG) => {
    const rgb = scaleRGB(inputRBG);
    const condList = [
        rgb[0] >= rgb[1] && rgb[1] >= rgb[2],
        rgb[1] > rgb[0] && rgb[0]>= rgb[2],
        rgb[1] >= rgb[2] && rgb[2] > rgb[0],
        rgb[2] > rgb[1] && rgb[1] > rgb[0],
        rgb[2] > rgb[0] && rgb[0] > rgb[1],
        rgb[0] >= rgb[2] && rgb[2] > rgb[1]
    ]
    const funcMap = [
        () => {return 60 * ((rgb[1] - rgb[2])/(rgb[0] - rgb[2]))},
        () => {return 60 * (2 - (rgb[0] - rgb[2])/(rgb[1] - rgb[2]))}, 
        () => {return 60 * (2 + (rgb[2] - rgb[0])/(rgb[1] - rgb[0]))},
        () => {return 60 * (4 - (rgb[1] - rgb[0])/(rgb[2] - rgb[0]))},
        () => {return 60 * (4 + (rgb[0] - rgb[1])/(rgb[2] - rgb[1]))},
        () => {return 60 * (6 - (rgb[2] - rgb[1])/(rgb[0] - rgb[1]))}
    ]
    return Math.round(funcMap[condList.findIndex(item => item)]())
}

const rgbToSaturation = (inputRGB) => {
    const lumosity = rgbToLumosity(inputRGB) 
    const rgb = inputRGB.map((item) => item/255)
    const condList = [
        lumosity < 1,
        lumosity == 1
    ]
    const funcMap = [
        () => {
            const numerator = Math.max(...rgb) - Math.min(...rgb)
            const absArg = 2 * lumosity - 1
            const denominator = 1 - Math.abs(absArg)
            return numerator/denominator
        },
        () => 0
    ]
    return parseFloat(funcMap[condList.findIndex(item => item)]().toFixed(2))
}

const rgbToLumosity = (inputRBG) => {
    const rgb = inputRBG.map((item) => item/255)
    return parseFloat((0.5 * (Math.max(...rgb) + Math.min(...rgb))).toFixed(2))
}

const hexToHSL = (hex) => {
    const rgb = hexToRGB(hex);
    const hsl = [rgbToHue(rgb), rgbToSaturation(rgb), rgbToLumosity(rgb)]
    return hsl
}

const HSLToCoordinate = (HSL) => {
    
}

const scheme = () => {
    const color = getRandomColor()
    console.log(color)
    console.log(hexToHSL(color));
}

scheme()
