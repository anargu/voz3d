const playlist = function () {
    this.partsFinished = []
    this.playlist = []
}

playlist.prototype.set = function (data) {
    this.playlist = [...data]
}

playlist.prototype.reset = function () {
    this.playlist = []
}

playlist.prototype.first = function () {
    return this.playlist[0]
}

playlist.prototype.hasNext = function () {
    this.playlist.shift()
    if (this.playlist.length > 0) {
        return true
    }
    return false
}

playlist.prototype.animationPartialFinish = function (part) {
    this.partsFinished.push(part)
}

playlist.prototype.animationHasFinished = function (part) {
    this.animationPartialFinish(part)
    if (this.partsFinished.length === 2) {
        // COMPLETE ANIMATION FINISHED
        this.partsFinished = []
        return true
    }
    return false
}

export default playlist