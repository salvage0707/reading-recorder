import Price from '@/modules/Price';
import {ItemsEntity} from '@/types/GoogleApiBook';

export default class Book {

    public static constructorFromGoogleApiBook(googleApiBook: ItemsEntity) {
        // authors
        const authors = googleApiBook.volumeInfo.authors;
        const joindAuthors = authors ? authors.join(',') : '';
        // price
        let price: Price | undefined;
        if (googleApiBook.saleInfo.listPrice) {
            price = new Price(
                googleApiBook.saleInfo.listPrice.amount,
                googleApiBook.saleInfo.listPrice.currencyCode,
            );
        }
        // publisher
        const publisher = googleApiBook.volumeInfo.publisher ? googleApiBook.volumeInfo.publisher : '';
        // publishedDate
        const publishedDate = new Date(googleApiBook.volumeInfo.publishedDate);
        // image
        const image = googleApiBook.volumeInfo.imageLinks;
        const imageUrl = image ? image.smallThumbnail : '';
        return new Book(
            googleApiBook.id,
            googleApiBook.volumeInfo.title,
            joindAuthors,
            price,
            publisher,
            publishedDate,
            imageUrl,
        );
    }

    constructor(
        public id?: string,
        public title?: string,
        public author?: string,
        public price?: Price,
        public publisher?: string,
        public published?: Date,
        public image?: string,
    ) {
    }
}
