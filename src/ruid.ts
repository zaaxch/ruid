export class Ruid {
    machine;
    sequence = 0n;
    lastTimestamp = -1n;


    constructor(machine = 1n) {
        this.machine = machine;
    }

    public next() {
        let currentTimestamp = BigInt(Date.now()) / 1000n;
        if (currentTimestamp < this.lastTimestamp) {
            throw new Error();
        } else {
            if (currentTimestamp === this.lastTimestamp) {
                this.sequence = this.sequence + 1n & 4095n;
                if (this.sequence === 0n) {
                    currentTimestamp = this.waitNextMillis(currentTimestamp);
                }
            } else {
                this.sequence = 0n;
            }
            this.lastTimestamp = currentTimestamp;
            return BigInt(currentTimestamp << 22n | this.machine << 12n | this.sequence).toString();
        }
    }

    private waitNextMillis(currentTimestamp) {
        while (currentTimestamp === this.lastTimestamp) {
            currentTimestamp = Date.now()
        }
        return currentTimestamp;
    }
}