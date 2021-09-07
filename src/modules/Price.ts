export default class Price {
    constructor(
        private readonly amount: number,
        private readonly currencyCode: string,
    ) {
    }

    public get() {
        return this.amount.toString() + this.unit();
    }

    public unit() {
        switch (this.currencyCode) {
            case 'USD':
                return 'ドル';
            case 'JPY':
                return '円';
            default:
                return '円';
        }
    }
}
