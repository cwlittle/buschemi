const getRandomColor = () => {
    return [getRandomInt(360), getRandomInt(100), getRandomInt(100)]
}

const getRandomInt = (maxVal) => {
    return Math.floor(Math.random() * Math.floor(maxVal)) 
}

const chunkArray = (input) => { return input.split('')
    .reduce((resultArray, item, index) => { 
        chunkIndex = Math.floor(index/2)
        resultArray[chunkIndex] = resultArray[chunkIndex] || []
        resultArray[chunkIndex].push(item)
        return resultArray
    }, [])
};


const getInscribedAngles = (numSides, angle) => {
    return [...Array(numSides).keys()]
        .reduce((angles, item) => {
            angles.push((item * 360/numSides + angle))
            return angles
        }, [])
}

const getInscribedPoints = (numSides, angle, r) => {
    return getInscribedAngles(numSides, angle)
        .reduce((points, theta) => {
            newX = r*Math.cos(theta * Math.PI/180) 
            newY = r*Math.sin(theta * Math.PI/180)
            points.push([newX, newY])
            return points
        }, []);
}

const pointsToHSL = (points, lumosity) => {
    return points.map((point) => {
        console.log(point)
        const angle =  Math.round(Math.atan(point[1]/point[0])*180/Math.PI) 
        const theta = () => angle >= 0 ? angle : Math.round(Math.atan(point[1]/point[0])*180/Math.PI) 
        const r = Math.round(Math.sqrt(point[0]**2 + point[1]**2))
        return [theta(), r, Math.round(lumosity)]
    })
}

const scheme = (numSides) => {
    const hsl = getRandomColor()
    const angles = getInscribedAngles(numSides, hsl[0])
    const hslScheme = angles.map((item) => { return [item%360, Math.round(hsl[1]), Math.round(hsl[2])]})
    console.log(hslScheme)
}

scheme(4)
