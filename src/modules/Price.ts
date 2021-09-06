export default class Price {
    constructor(
        private readonly value: number,
        private readonly unit: string,
    ) {
    }

    public get() {
        return this.value.toString() + this.unit;
    }
}
