import Price from '@/modules/Price';

export default class Book {
    constructor(
        public id?: string,
        public title?: string,
        public author?: string,
        public price?: Price,
        public publisher?: string,
        public published?: Date,
        public image?: string,
    ) {}
}
